import { TemplateConfig } from '../manager.js';
export const wakuAppTemplate: TemplateConfig = {
    id: 'waku-app', name: 'waku App', description: 'waku application', framework: 'vanilla', type: 'spa',
    dependencies: {}, devDependencies: { '@types/node': '^20.0.0' },
    files: {
        'sparx.config.ts': "import { defineConfig } from 'sparx';\nexport default defineConfig({ framework: 'waku' });",
        'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>{{PROJECT_NAME}}</title><style>body{font-family:system-ui;background:#0f172a;color:#f1f5f9;margin:0;display:flex;align-items:center;justify-content:center;height:100vh} .card{background:#1e293b;padding:40px;border-radius:12px;text-align:center;border:1px solid #334155} h1{color:#818cf8;margin:0 0 10px;font-size:32px} p{color:#94a3b8;margin:0}</style></head><body><div class="card"><h1>⚡ Sparx + waku</h1><p>Built with the Sparx engine.</p></div><script type="module" src="/src/main.ts"></script></body></html>`,
        'src/main.ts': `console.log('Sparx + waku running!');`
    }
};
