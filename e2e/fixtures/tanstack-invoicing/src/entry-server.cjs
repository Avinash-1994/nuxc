const fs = require('fs');
const path = require('path');

// Mock TanStack Start server entry for testing
module.exports = {
  // Used by RR-01 test in Phase 2.10
  scanRoutes: (root) => {
    return [
      { path: '/', ssr: true, isApi: false, isServerFn: false },
      { path: '/api/invoices', ssr: false, isApi: true, isServerFn: false },
      { path: '/api/invoices_serverFn', ssr: false, isApi: true, isServerFn: true },
      { path: '/invoices/$id', ssr: true, isApi: false, isServerFn: false }
    ];
  },

  handleApi: async (url, { req }) => {
    if (url.includes('/api/invoices_serverFn')) {
      return { serverFn: true, message: 'Server function executed safely' };
    }
    if (url.includes('/api/invoices')) {
      return [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
    }
    return null;
  },

  renderRoute: async (url, { root }) => {
    if (url === '/spa') {
       return {
         spa: true,
         indexHtml: '<!DOCTYPE html><html><body><div id="root"></div><!-- SPA: TanStack hydrates here client-side --></body></html>'
       };
    }
    
    // Simulate SSR logic
    const dataString = '<script id="__tanstack_data__" type="application/json">{"invoices":[{"id":"INV-123","amount":500,"status":"paid"}]}</script>';
    
    return {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoices | TanStack Start App</title>
</head>
<body>
  <div id="root">
    <h1>Invoices</h1>
    <div class="invoice" data-ts-state="active">INV-123 - $500</div>
  </div>
  ${dataString}
</body>
</html>`
    };
  },

  emitBuildArtifacts: (root, outDir) => {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.mkdirSync(path.join(outDir, 'assets'), { recursive: true });
    fs.mkdirSync(path.join(outDir, 'server'), { recursive: true });
    
    fs.writeFileSync(path.join(outDir, 'index.html'), '<!DOCTYPE html><html><body><div id="root"></div></body></html>');
    fs.writeFileSync(path.join(outDir, 'invoices.html'), '<!DOCTYPE html><html><body><div id="root"></div></body></html>');
    
    const clientCode = `"use strict";(()=>{var Ts=Object.create;var $r=Object.defineProperty;var Tr=Object.getOwnPropertyDes/* mock tanstack bundle */ const createRouter = {}; const RouterProvider = {}; const createRoute = {}; const TanStackRouterDevtools = {};})();`;
    // make the bundle > 10KB
    const padding = "/* tanstack padding */\n".repeat(10000); 
    
    fs.writeFileSync(path.join(outDir, 'assets', 'client.js'), clientCode + padding);
    fs.writeFileSync(path.join(outDir, 'server', 'index.js'), 'module.exports = { createRouter: {} };');
  }
};
