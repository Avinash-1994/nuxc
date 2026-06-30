/**
 * @nuce/rollup-compat - Plugin Compatibility Layer
 * 
 * This module provides adapters to use Rollup/Vite plugins within Nuce.
 */

export { rollupAdapter, rollupAdapter as vitePluginAdapter, rollupAdapter as viteToNuce, rollupAdapter as createRollupAdapter } from './rollup.js';
export {
    nuceBabel,
    nuceTerser,
    nuceJson,
    nuceYaml,
    nuceMdx,
    nuceSvgr,
    TierA
} from './tier-a.js';

export { webpackLoaderAdapter } from './webpack.js';
export * from './tier-b.js'; // nuceCopy, nuceHtml
export * from './tier-c.js'; // nuceReact, nuceVue, nuceSvelte
export * from './deferred.js'; // nuceCompress, nuceCssExtract
