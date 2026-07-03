/**
 * @nuxc/rollup-compat - Plugin Compatibility Layer
 * 
 * This module provides adapters to use Rollup/Vite plugins within Nuxc.
 */

export { rollupAdapter, rollupAdapter as vitePluginAdapter, rollupAdapter as viteToNuxc, rollupAdapter as createRollupAdapter } from './rollup.js';
export {
    nuxcBabel,
    nuxcTerser,
    nuxcJson,
    nuxcYaml,
    nuxcMdx,
    nuxcSvgr,
    TierA
} from './tier-a.js';

export { webpackLoaderAdapter } from './webpack.js';
export * from './tier-b.js'; // nuxcCopy, nuxcHtml
export * from './tier-c.js'; // nuxcReact, nuxcVue, nuxcSvelte
export * from './deferred.js'; // nuxcCompress, nuxcCssExtract
