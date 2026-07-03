/**
 * @nuxco/plugin-analytics
 * Build analytics
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createAnalyticsPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-analytics',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: Build analytics
            return { code };
        }
    };
}

export default createAnalyticsPlugin;
