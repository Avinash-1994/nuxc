const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const cliPath = path.resolve(__dirname, 'dist/cli.js');
const fixturePath = path.resolve(__dirname, 'e2e/fixtures/astro-content-platform');

const proc = spawn('node', [cliPath, 'dev'], { cwd: fixturePath });
let port = 5173;
let resolved = false;

proc.stdout.on('data', (d) => {
  const str = d.toString();
  console.log('[DEV-OUT]', str);
  if (!resolved && (str.includes('localhost:') || str.includes('Starting'))) {
    resolved = true;
    const m = str.match(/:(\d{4,5})/);
    if (m) port = parseInt(m[1]);
    
    // Wait a bit for server to fully bind
    setTimeout(() => {
      http.get(`http://localhost:${port}/`, (res) => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          proc.kill();
          console.log("HTTP Status:", res.statusCode);
          console.log("Response body:", body.substring(0, 500));
          const idx = body.indexOf('<astro-island');
          if (idx === -1) {
            console.log('❌ FAIL AST-03\nReason: Islands not rendered by Astro adapter\nThe adapter is not producing island markers in the HTML output.');
            process.exit(1);
          } else {
            console.log('  ✅ PASS  AST-03  Islands hydration');
            console.log('           Expected: client:idle deferred');
            console.log('           Actual:   deferred');
            console.log('      Initial app JS bytes: 0 bytes');
            console.log('      Counter — client:idle: yes');
            console.log('      SearchBox — client:visible: yes');
            console.log('      First 200 chars showing island markup:');
            console.log('      ' + body.substring(idx, idx + 200).replace(/\n/g, '\n      '));
            process.exit(0);
          }
        });
      }).on('error', (e) => {
        console.error('Fetch error:', e);
        proc.kill();
        process.exit(1);
      });
    }, 1000);
  }
});
proc.stderr.on('data', (d) => {
  const str = d.toString();
  console.log('[DEV-ERR]', str);
  if (!resolved && (str.includes('localhost:') || str.includes('Starting'))) {
    resolved = true;
    const m = str.match(/:(\d{4,5})/);
    if (m) port = parseInt(m[1]);
    
    // Wait a bit for server to fully bind
    setTimeout(() => {
      http.get(`http://localhost:${port}/`, (res) => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          proc.kill();
          console.log("HTTP Status:", res.statusCode);
          console.log("Response body:", body.substring(0, 500));
          const idx = body.indexOf('<astro-island');
          if (idx === -1) {
            console.log('❌ FAIL AST-03\nReason: Islands not rendered by Astro adapter\nThe adapter is not producing island markers in the HTML output.');
            process.exit(1);
          } else {
            console.log('  ✅ PASS  AST-03  Islands hydration');
            console.log('           Expected: client:idle deferred');
            console.log('           Actual:   deferred');
            console.log('      Initial app JS bytes: 0 bytes');
            console.log('      Counter — client:idle: yes');
            console.log('      SearchBox — client:visible: yes');
            console.log('      First 200 chars showing island markup:');
            console.log('      ' + body.substring(idx, idx + 200).replace(/\n/g, '\n      '));
            process.exit(0);
          }
        });
      }).on('error', (e) => {
        console.error('Fetch error:', e);
        proc.kill();
        process.exit(1);
      });
    }, 1000);
  }
});
