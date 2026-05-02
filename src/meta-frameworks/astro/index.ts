import type { SparxAdapter, Plugin, SparxConfig, PackageJson, Middleware } from '@sparx/adapter-core';
import { detectDependencies, registry } from '@sparx/adapter-core';
import { astroCompilerPlugin } from './compiler-plugin.js';
import { astroIslandPlugin } from './island-plugin.js';
import { astroContentPlugin } from './content-plugin.js';

export interface AstroConfig {
  srcDir?: string;       // default: src
  publicDir?: string;    // default: public
  outDir?: string;       // default: dist
  site?: string;         // canonical URL for SSG
  trailingSlash?: 'always' | 'never' | 'ignore';
}

export class AstroAdapter implements SparxAdapter {
  name = 'astro';

  detect(projectRoot: string, pkg: PackageJson): boolean {
    return detectDependencies(pkg, ['astro']);
  }

  plugins(): Plugin[] {
    return [
      astroCompilerPlugin(),
      astroIslandPlugin(),
      astroContentPlugin()
    ];
  }

  config(config: SparxConfig): SparxConfig {
    if (!config.astro) config.astro = {};
    config.astro = {
      srcDir: 'src',
      publicDir: 'public',
      outDir: 'dist',
      trailingSlash: 'ignore',
      ...(config.astro || {})
    };
    return config;
  }

  getDevHandler(): any {
    return async (req: any, res: any, next: any) => {
          try {
             const path = await import('path');
             const { pathToFileURL } = await import('url');
             const entryPath = path.join(process.cwd(), 'src/entry-server.cjs');
             const entry = await import(pathToFileURL(entryPath).href);
             // dynamic import of CJS returns it on default
             const adapter = entry.default || entry;
             const result = adapter.renderPage(req.url, { root: process.cwd() });
             if (result && result.html) {
                res.setHeader('Content-Type', 'text/html');
                res.end(result.html);
                return;
             }
          } catch (e) {
             console.error('[SPARX Astro] Dev handler error:', e);
             // fallback
          }
          next();
       };
  }

  ssrEntry(): string {
     return 'src/entry.server.ts'; // standard Astro virtual entry
  }
}

registry.register(new AstroAdapter());
