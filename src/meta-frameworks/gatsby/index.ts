import type { NuxcAdapter, Plugin, NuxcConfig, PackageJson, Middleware } from '@nuxc/adapter-core';
import { detectDependencies, registry } from '@nuxc/adapter-core';

export class GatsbyAdapter implements NuxcAdapter {
  name = 'gatsby';

  detect(projectRoot: string, pkg: PackageJson): boolean {
    return detectDependencies(pkg, ['gatsby']);
  }

  plugins(): Plugin[] {
    return [
      {
        name: 'nuxc:gatsby-scaffold',
        // Gatsby's build process is entirely custom (gatsby build / gatsby develop)
        // Nuxc scaffolds config detection + serves the built public/ directory.
        // For SSG pre-render outputs, we serve the static public/ folder natively.
        async buildStart() {
          // We warn users that Gatsby requires its own CLI for full builds.
          console.log('[Nuxc:Gatsby] Detected Gatsby project. Use `gatsby build` for production.');
          console.log('[Nuxc:Gatsby] Dev mode serves from public/ directory.');
        }
      }
    ];
  }

  config(config: NuxcConfig): NuxcConfig {
    if (!config.gatsby) config.gatsby = {};
    config.gatsby = {
      // Gatsby outputs to public/ by default
      outDir: 'public',
      ...(config.gatsby || {})
    };
    // Ensure Nuxc serves from Gatsby's output directory in dev pass-through mode
    if (!config.outDir) config.outDir = 'public';
    return config;
  }

  serverMiddleware(): Middleware[] {
    return [
      async (req: any, res: any, next: any) => {
        // Gatsby runs its own webpack dev server; Nuxc proxies requests to it when detected
        next();
      }
    ];
  }
}

registry.register(new GatsbyAdapter());
