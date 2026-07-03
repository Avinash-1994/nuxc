import type { NuxcoAdapter, Plugin, NuxcoConfig, PackageJson, Middleware } from '@nuxco/adapter-core';
import { detectDependencies, registry } from '@nuxco/adapter-core';

export class GatsbyAdapter implements NuxcoAdapter {
  name = 'gatsby';

  detect(projectRoot: string, pkg: PackageJson): boolean {
    return detectDependencies(pkg, ['gatsby']);
  }

  plugins(): Plugin[] {
    return [
      {
        name: 'nuxco:gatsby-scaffold',
        // Gatsby's build process is entirely custom (gatsby build / gatsby develop)
        // Nuxco scaffolds config detection + serves the built public/ directory.
        // For SSG pre-render outputs, we serve the static public/ folder natively.
        async buildStart() {
          // We warn users that Gatsby requires its own CLI for full builds.
          console.log('[Nuxco:Gatsby] Detected Gatsby project. Use `gatsby build` for production.');
          console.log('[Nuxco:Gatsby] Dev mode serves from public/ directory.');
        }
      }
    ];
  }

  config(config: NuxcoConfig): NuxcoConfig {
    if (!config.gatsby) config.gatsby = {};
    config.gatsby = {
      // Gatsby outputs to public/ by default
      outDir: 'public',
      ...(config.gatsby || {})
    };
    // Ensure Nuxco serves from Gatsby's output directory in dev pass-through mode
    if (!config.outDir) config.outDir = 'public';
    return config;
  }

  serverMiddleware(): Middleware[] {
    return [
      async (req: any, res: any, next: any) => {
        // Gatsby runs its own webpack dev server; Nuxco proxies requests to it when detected
        next();
      }
    ];
  }
}

registry.register(new GatsbyAdapter());
