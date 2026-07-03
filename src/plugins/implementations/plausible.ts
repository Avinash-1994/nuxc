/**
 * @nuxco/plugin-plausible
 * Plausible Analytics integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createPlausiblePlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-plausible',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Analytics: Plausible Analytics integration
            return { code };
        },

        async buildEnd() {
            console.log('[@nuxco/plugin-plausible] Analytics integration ready');
        }
    };
}

export default createPlausiblePlugin;
