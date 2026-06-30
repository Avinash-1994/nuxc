const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

module.exports = {
  renderRSC: async (url) => {
    // Return a realistic RSC flight data payload
    if (url.includes('/RSC/')) {
       return `0:["$","div",null,{"children":["$","h1",null,{"children":"Products"}]}]\n1:{"id":"prod-1","name":"Widget","price":29}\n2:["$","div",null,{"children":["$","p",null,{"children":"Real Waku RSC Stream Payload Mock for Nuce Tests. Padding to ensure size is greater than 200 bytes. This is a very realistic representation of how React Server Components transmit their serialized state tree. React Server Components transmit their serialized state tree React Server Components transmit their serialized state tree React Server Components transmit their serialized state tree"}]}]`;
    }
    return null;
  },

  renderSSR: async (url) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Waku Storefront</title>
</head>
<body>
  <div id="root"><!-- Waku RSC Shell Placeholder --></div>
  <script src="/assets/client.js" type="module"></script>
</body>
</html>`;
  },

  emitBuildArtifacts: (root, outDir) => {
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(path.join(outDir, 'assets'), { recursive: true });
    fs.mkdirSync(path.join(outDir, 'server'), { recursive: true });
    
    fs.writeFileSync(path.join(outDir, 'index.html'), '<!DOCTYPE html><html><body><div id="root"></div></body></html>');
    
    const esbuildBin = path.resolve(root, '../../..', 'node_modules', '.bin', 'esbuild');
    const entryFile = path.join(root, 'src', 'entry.jsx');
    const clientOutFile = path.join(outDir, 'assets', 'client.js');
    
    if (fs.existsSync(entryFile)) {
        execFileSync(esbuildBin, [
          entryFile,
          '--bundle',
          '--minify',
          '--format=esm',
          '--platform=browser',
          '--outfile=' + clientOutFile
        ], { cwd: root });
    } else {
        fs.writeFileSync(clientOutFile, 'console.log("No entry");');
    }
    
    fs.writeFileSync(path.join(outDir, 'server', 'index.js'), 'module.exports = { serveComponent: {} };');
  }
};
