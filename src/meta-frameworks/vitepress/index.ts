import type { NuxcoAdapter, Plugin, NuxcoConfig, PackageJson, Middleware } from '@nuxco/adapter-core';
import { detectDependencies, registry } from '@nuxco/adapter-core';
import { vitepressMarkdownPlugin } from './press-plugin.js';

export interface VitePressConfig {
  srcDir?: string;       // default '.'
  outDir?: string;       // default '.vitepress/dist'
  cleanUrls?: boolean;   // default false
}

export class VitePressAdapter implements NuxcoAdapter {
  name = 'vitepress';

  detect(projectRoot: string, pkg: PackageJson): boolean {
    return detectDependencies(pkg, ['vitepress']);
  }

  plugins(): Plugin[] {
    return [
      vitepressMarkdownPlugin()
    ];
  }

  config(config: NuxcoConfig): NuxcoConfig {
    if (!config.vitepress) config.vitepress = {};
    config.vitepress = {
      srcDir: '.',
      outDir: '.vitepress/dist',
      cleanUrls: false,
      ...(config.vitepress || {})
    };
    return config;
  }

  // BUG-004: use getDevHandler not serverMiddleware
  // BUG-002: null guard on req/res
  getDevHandler(): any {
    return async (req: any, res: any, next: any) => {
      if (!req || !res) return next?.();

      try {
         const virtualEntry = 'virtual:nuxco/vitepress-router';
         let router: any;
         try {
            router = await import(virtualEntry);
         } catch(e) {
            // If virtual module isn't loaded/ready, load from entry-server.cjs
            const path = await import('path');
            const { pathToFileURL } = await import('url');
            const fs = await import('fs');
            const entryPath = path.join(process.cwd(), 'src', 'entry-server.cjs');
            if (fs.existsSync(entryPath)) {
                const entryModule = await import(pathToFileURL(entryPath).href);
                router = entryModule.default || entryModule;
            } else {
                return next();
            }
         }

         const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

         if (router && router.renderSSR) {
            const html = await router.renderSSR(url.pathname);
            if (html) {
               res.setHeader('Content-Type', 'text/html');
               res.end(html);
               return;
            }
         }

         next();
      } catch(e) {
         console.error('[Nuxco:VitePress] Error rendering SSR', e);
         next();
      }
    };
  }

  ssrEntry(): string {
     return 'src/entry-server.cjs';
  }
}

registry.register(new VitePressAdapter());
