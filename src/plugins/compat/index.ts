/**
 * @zeptr/rollup-compat - Plugin Compatibility Layer
 * 
 * This module provides adapters to use Rollup/Vite plugins within Zeptr.
 */

export { rollupAdapter, rollupAdapter as vitePluginAdapter, rollupAdapter as viteToZeptr, rollupAdapter as createRollupAdapter } from './rollup.js';
export {
    zeptrBabel,
    zeptrTerser,
    zeptrJson,
    zeptrYaml,
    zeptrMdx,
    zeptrSvgr,
    TierA
} from './tier-a.js';

export { webpackLoaderAdapter } from './webpack.js';
export * from './tier-b.js'; // zeptrCopy, zeptrHtml
export * from './tier-c.js'; // zeptrReact, zeptrVue, zeptrSvelte
export * from './deferred.js'; // zeptrCompress, zeptrCssExtract
