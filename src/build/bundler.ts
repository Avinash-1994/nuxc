import fs from 'fs';
import path from 'path';
import { BuildConfig } from '../config/index.js';


export async function build(rawConfig: BuildConfig) {
  let config = rawConfig;

  // Step 2: detect active framework adapter
  let adapter: any = null;
  try {
    const { registry } = await import('@sparx/adapter-core');
    const pkgPath = path.join(config.root, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

      // Pre-load common meta-framework adapters so they register themselves
      const adaptersToTry = [
        'solidstart', 'sveltekit', 'astro', 'qwikcity', 'remix', 
        'nextjs', 'nuxt', 'tanstack-start', 'waku', 'analog', 'react-router', 'vitepress', 'tauri', 'electron',
        'gatsby', 'redwoodjs', 'stencil', 'marko', 'docusaurus'
      ];
      
      for (const name of adaptersToTry) {
        try {
          await import(`../meta-frameworks/${name}/index.js`);
        } catch (e: any) {
          if (name === 'solidstart') console.log(`[DEBUG] Failed to import ${name}:`, e.message);
        }
      }
      try {
        await import('../framework-adapters/angular/index.js');
      } catch (e) {}

      adapter = registry.detect(config.root, pkg);
      if (!adapter) console.log(`[DEBUG] registry.detect returned null for ${config.root}`);
    }
  } catch (err) {
    console.error('[DEBUG] Failed to load adapter-core:', err);
    // Ignore if adapter-core is not available
  }



  // Step 3: let adapter modify config
  if (adapter) {
    if (adapter.config) {
      config = await adapter.config(config) as BuildConfig;
    }
    console.log(`[sparx] adapter: ${adapter.name}`);
  }

  // Step 4: merge adapter plugins into plugin list
  if (adapter && adapter.plugins) {
    const adapterPlugins = adapter.plugins();
    config.plugins = [...adapterPlugins, ...(config.plugins ?? [])];
  }

  console.log('🏗️  Starting Build Pipeline...');
  console.log('📁 Root:', config.root);
  console.log('📦 Entry:', config.entry);
  console.log('📂 Output:', config.outDir);

  const { FrameworkPipeline } = await import('../core/pipeline/framework-pipeline.js');
  const pipeline = await FrameworkPipeline.auto(config);

  try {
    const result = await pipeline.build();
    if (!result.success) {
      const errorMsg = (result as any).error?.message || 'Unknown build error';
      throw new Error(errorMsg);
    }

    // Day 52: Print final bundle stats in production mode
    if (config.mode === 'production') {
      const { printBundleStats } = await import('./bundle-stats.js');
      // Extract artifacts from targets
      const artifacts = (result as any).targets ? (result as any).targets.flatMap((t: any) => t.artifacts) : (result as any).artifacts || [];
      printBundleStats(artifacts);
    }

    // Step 6: run adapter post-build hook
    const outDir = config.outDir || 'build_output';
    if (adapter && adapter.buildOutput) {
      await adapter.buildOutput(outDir);
    }

    console.log('✅ Build completed successfully!');
    return result; // Added
  } catch (error: any) {
    console.error('❌ Build failed:', error.message);
    throw error;
  } finally {
    await pipeline.close();
  }
}
