/**
 * Edge Function Starter Template
 * Universal Edge Runtime setup
 */

import { TemplateConfig } from '../manager.js';

export const edgeTemplate: TemplateConfig = {
    id: 'edge-function',
    name: 'Edge Function (Universal)',
    description: 'Minimal Edge Function compatible with Vercel/Cloudflare/Netlify',
    framework: 'vanilla',
    type: 'edge',
    dependencies: {},
    devDependencies: {
        "typescript": "^5.0.0",
        "@zeptr/plugin-edge": "^1.0.0"
    },
    files: {
        'zeptr.config.ts': `
import { defineConfig } from 'zeptr';
import edge from '@zeptr/plugin-edge';

export default defineConfig({
    plugins: [edge()],
    build: {
        target: 'esnext',
        outDir: 'dist/edge'
    }
});
`,
        'src/index.ts': `
// Edge Function Entry Point
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/hello') {
        return new Response('Hello from Zeptr Edge!', {
            headers: { 'content-type': 'text/plain' }
        });
    }

    return new Response(\`
      <!DOCTYPE html>
      <html>
        <head><title>Zeptr Edge</title></head>
        <body>
          <h1>⚡ Zeptr Edge Runtime</h1>
          <p>Request URL: \${request.url}</p>
          <p>Region: \${request.cf?.colo || 'Local'}</p>
        </body>
      </html>
    \`, {
      headers: { 'content-type': 'text/html' }
    });
  }
};
`,
        'tsconfig.json': `
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ESNext", "WebWorker"],
    "types": ["@cloudflare/workers-types"],
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
`,
        'README.md': `
# Zeptr Edge Function

This is a universal Edge Function starter compatible with:
- Cloudflare Workers
- Vercel Edge Functions
- Netlify Edge Functions

## Development

\`\`\`bash
npm run dev
\`\`\`

## Deployment

\`\`\`bash
npm run build
npx wrangler publish # For Cloudflare
\`\`\`
`
    }
};
