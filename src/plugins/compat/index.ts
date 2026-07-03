/**
 * @nuxco/rollup-compat - Plugin Compatibility Layer
 * 
 * This module provides adapters to use Rollup/Vite plugins within Nuxco.
 */

export { rollupAdapter, rollupAdapter as vitePluginAdapter, rollupAdapter as viteToNuxco, rollupAdapter as createRollupAdapter } from './rollup.js';
export {
    nuxcoBabel,
    nuxcoTerser,
    nuxcoJson,
    nuxcoYaml,
    nuxcoMdx,
    nuxcoSvgr,
    TierA
} from './tier-a.js';

export { webpackLoaderAdapter } from './webpack.js';
export * from './tier-b.js'; // nuxcoCopy, nuxcoHtml
export * from './tier-c.js'; // nuxcoReact, nuxcoVue, nuxcoSvelte
export * from './deferred.js'; // nuxcoCompress, nuxcoCssExtract
