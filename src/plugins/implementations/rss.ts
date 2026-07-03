/**
 * @nuxco/plugin-rss
 * RSS feed generation
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createRssPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-rss',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: RSS feed generation
            return { code };
        }
    };
}

export default createRssPlugin;
