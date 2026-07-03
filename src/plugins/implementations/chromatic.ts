/**
 * @zeptr/plugin-chromatic
 * Chromatic visual testing
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createChromaticPlugin(): PluginAdapter {
    return {
        name: '@zeptr/plugin-chromatic',
        originalPlugin: 'zeptr-native',
        
        async transform(code: string, id: string) {
            // Utility: Chromatic visual testing
            return { code };
        }
    };
}

export default createChromaticPlugin;
