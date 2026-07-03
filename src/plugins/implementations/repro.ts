/**
 * @nuxco/plugin-repro
 * Reproduction case generator
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createReproPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-repro',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: Reproduction case generator
            return { code };
        }
    };
}

export default createReproPlugin;
