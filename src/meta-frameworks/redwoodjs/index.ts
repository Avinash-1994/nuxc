import type { NuceAdapter, Plugin, NuceConfig, PackageJson, Middleware } from '@nuce/adapter-core';
import { detectDependencies, registry } from '@nuce/adapter-core';

export class RedwoodAdapter implements NuceAdapter {
  name = 'redwoodjs';

  detect(projectRoot: string, pkg: PackageJson): boolean {
    return detectDependencies(pkg, ['@redwoodjs/core', '@redwoodjs/router']);
  }

  plugins(): Plugin[] {
    return [
      {
        name: 'nuce:redwood-scaffold',
        async buildStart() {
          console.log('[Nuce:RedwoodJS] Detected RedwoodJS project.');
          console.log('[Nuce:RedwoodJS] Use `yarn rw dev` for the full RedwoodJS dev experience.');
          console.log('[Nuce:RedwoodJS] Nuce handles the web/ side bundling natively.');
        }
      }
    ];
  }

  config(config: NuceConfig): NuceConfig {
    if (!config.redwood) config.redwood = {};
    config.redwood = {
      // RedwoodJS splits into web/ (frontend) and api/ (backend graphql)
      webSrc: 'web/src',
      apiSrc: 'api/src',
      ...(config.redwood || {})
    };
    return config;
  }

  serverMiddleware(): Middleware[] {
    return [
      async (req: any, res: any, next: any) => {
        // RedwoodJS API requests go to /.redwood/functions/ — proxy to the Redwood api server
        const url = req.url || '/';
        if (url.startsWith('/.redwood/') || url.startsWith('/api/')) {
          // Log and pass; a full implementation would proxy to localhost:8911
          console.log(`[Nuce:RedwoodJS] API request detected: ${url} — ensure \`yarn rw dev api\` is running.`);
        }
        next();
      }
    ];
  }
}

registry.register(new RedwoodAdapter());
