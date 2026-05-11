import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(m) { process.stdout.write(m + '\n'); }
function pass(id, exp, act, d = []) {
  log(`  ✅ PASS  ${id}`);
  log(`           Expected: ${exp}`);
  log(`           Actual:   ${act}`);
  d.forEach(x => log(`      ${x}`)); log('');
}
function fail(id, exp, act, d = []) {
  log(`  ❌ FAIL  ${id}`);
  log(`           Expected: ${exp}`);
  log(`           Actual:   ${act}`);
  d.forEach(x => log(`      ${x}`)); log(''); process.exitCode = 1;
}

const cliPath = path.resolve(__dirname, '../../../dist/cli.js');

log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
log(' PHASE 3.2 — BUILD PROCESS ISOLATION');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// SEC-04 Secret Scanner
{
  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify({ type: 'module' }));
  fs.writeFileSync(path.join(__dirname, 'sparx.config.ts'), `export default { entry: ['src/index.js'] };`);
  fs.mkdirSync(path.join(__dirname, 'src'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'src', 'index.js'), `
    const API_KEY = "AKIA1234567890123456"; // fake AWS key
    console.log(API_KEY);
  `);
  
  const res = spawnSync('node', [cliPath, 'build'], { cwd: __dirname, encoding: 'utf8' });
  const ok = res.status !== 0 && res.stderr.includes('Potential secret detected');
  (ok ? pass : fail)('SEC-04 Secret Scanner', 'abort build', ok ? 'aborted' : 'passed', ['Detected cleartext secret in output']);
}

// SEC-05 Plugin Permissions (Env Access)
{
  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify({ type: 'module' }));
  fs.writeFileSync(path.join(__dirname, 'sparx.config.ts'), `
    export default {
      plugins: [{
        name: 'test-plugin',
        buildEnd() {
          console.log("SECRET_ENV_VAR=" + this.process.env.SECRET_ENV_VAR);
        }
      }]
    };
  `);
  fs.writeFileSync(path.join(__dirname, 'src', 'index.js'), `console.log("hello");`);
  
  const res = spawnSync('node', [cliPath, 'build'], { cwd: __dirname, env: { ...process.env, SECRET_ENV_VAR: 'TOP_SECRET_VALUE' }, encoding: 'utf8' });
  const ok = !res.stdout.includes('TOP_SECRET_VALUE') && (res.stdout.includes('Plugin attempted to read env var') || res.stderr.includes('requires env:read permission'));
  (ok ? pass : fail)('SEC-05 Plugin Permissions', 'block env access', ok ? 'blocked' : 'allowed', ['Blocked unauthorized env:read']);
}
