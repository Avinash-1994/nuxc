/**
 * @nuxco/plugin-sitemap
 * Sitemap generation
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createSitemapPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-sitemap',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: Sitemap generation
            return { code };
        }
    };
}

export default createSitemapPlugin;
