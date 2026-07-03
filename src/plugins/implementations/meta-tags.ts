/**
 * @nuxco/plugin-meta-tags
 * SEO meta tags
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createMetaTagsPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-meta-tags',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: SEO meta tags
            return { code };
        }
    };
}

export default createMetaTagsPlugin;
