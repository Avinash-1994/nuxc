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
log(' PHASE 3.3 — OUTPUT HARDENING');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// SEC-06 SRI and CSP injection
{
  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify({ type: 'module' }));
  fs.writeFileSync(path.join(__dirname, 'sparx.config.ts'), `export default { entry: ['src/index.js'] };`);
  fs.mkdirSync(path.join(__dirname, 'src'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'src', 'index.js'), `
    console.log("hello world");
  `);
  
  // Create an HTML file so it gets bundled
  fs.writeFileSync(path.join(__dirname, 'index.html'), `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <script src="/src/index.js"></script>
        <script>console.log("inline script")</script>
      </body>
    </html>
  `);
  
  const res = spawnSync('node', [cliPath, 'build'], { cwd: __dirname, encoding: 'utf8' });
  if (res.status !== 0) {
    fail('SEC-06 SRI & CSP', '0', res.status, [res.stderr]);
  } else {
    // Read the output index.html
    const outHtml = fs.readFileSync(path.join(__dirname, 'build_output', 'index.html'), 'utf8');
    
    // Check for SRI
    const hasSRI = outHtml.includes('integrity="sha384-') && outHtml.includes('crossorigin="anonymous"');
    // Check for CSP meta tag
    const hasCSP = outHtml.includes('<meta http-equiv="Content-Security-Policy"');
    
    const hasHeadersFile = fs.existsSync(path.join(__dirname, 'build_output', '_headers'));
    const hasHtaccess = fs.existsSync(path.join(__dirname, 'build_output', '.htaccess'));
    
    const ok = hasSRI && hasCSP && hasHeadersFile && hasHtaccess;
    (ok ? pass : fail)('SEC-06 SRI & CSP', 'hashes on all scripts, CSP blocks inline eval', ok ? 'injected' : 'missing', [
      hasSRI ? '✅ SRI injected' : '❌ SRI missing',
      hasCSP ? '✅ CSP injected' : '❌ CSP missing',
      hasHeadersFile ? '✅ _headers generated' : '❌ _headers missing',
      hasHtaccess ? '✅ .htaccess generated' : '❌ .htaccess missing'
    ]);
  }
}
