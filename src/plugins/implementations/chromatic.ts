/**
 * @nuxco/plugin-chromatic
 * Chromatic visual testing
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createChromaticPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-chromatic',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: Chromatic visual testing
            return { code };
        }
    };
}

export default createChromaticPlugin;
