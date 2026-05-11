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
log(' PHASE 3.1 — SUPPLY CHAIN SECURITY');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// SC-01 Lockfile Tampering
{
  const lockfile = {
    name: 'test', version: '1.0.0', lockfileVersion: 2,
    packages: {
      '': { version: '1.0.0' },
      'node_modules/lodash': { version: '4.17.21', integrity: 'sha512-fake-tampered-hash' }
    }
  };
  fs.writeFileSync(path.join(__dirname, 'package-lock.json'), JSON.stringify(lockfile, null, 2));
  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify({ type: 'module', dependencies: { lodash: '4.17.21' } }));
  
  const res = spawnSync('node', [cliPath, 'build'], { cwd: __dirname, encoding: 'utf8' });
  const ok = res.status !== 0 && res.stderr.includes('Lockfile tampering detected') || res.stdout.includes('Lockfile tampering detected');
  (ok ? pass : fail)('SEC-01 Lockfile tampering', 'abort build', ok ? 'aborted' : 'passed', ['Tampered integrity hash triggered abort']);
}

// SC-02 CVE Scanner Blocks
{
  // Remove lockfile
  fs.rmSync(path.join(__dirname, 'package-lock.json'));
  // Use a known vulnerable package (e.g. marked 0.3.5)
  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify({ type: 'module', dependencies: { 'marked': '0.3.5' } }));
  fs.mkdirSync(path.join(__dirname, 'src'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'src', 'index.js'), 'console.log("hello");');
  
  const res = spawnSync('node', [cliPath, 'build'], { cwd: __dirname, encoding: 'utf8' });
  const ok = res.status !== 0 && (res.stderr.includes('HIGH CVE') || res.stdout.includes('HIGH CVE'));
  if (!ok) {
    console.log("SEC-02 FAILED. Status:", res.status);
    console.log("STDOUT:\n", res.stdout);
    console.log("STDERR:\n", res.stderr);
  }
  (ok ? pass : fail)('SEC-02 CVE scanner', 'blocks bad deps', ok ? 'blocked' : 'passed', ['Detected HIGH CVE in marked@0.3.5']);
}

// SC-03 Generate SBOM
{
  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify({ type: 'module', dependencies: { 'is-odd': '3.0.1' } }));
  fs.rmSync(path.join(__dirname, '.sparx', 'security'), { recursive: true, force: true });
  
  const res = spawnSync('node', [cliPath, 'build'], { cwd: __dirname, encoding: 'utf8' });
  const sbomPath = path.join(__dirname, 'build_output', 'sparx-sbom.json');
  const ok = fs.existsSync(sbomPath) && res.status === 0;
  if (ok) {
    const sbom = JSON.parse(fs.readFileSync(sbomPath, 'utf8'));
    pass('SEC-03 SBOM Generation', 'dist/sparx-sbom.json', 'generated', [
      `Format: ${sbom.bomFormat} ${sbom.specVersion}`,
      `Components: ${sbom.components?.length}`
    ]);
  } else {
    fail('SEC-03 SBOM Generation', 'dist/sparx-sbom.json', 'missing');
  }
}
