/**
 * @nuxc/plugin-vitest
 * Vitest integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createVitestPlugin(): PluginAdapter {
    return {
        name: '@nuxc/plugin-vitest',
        originalPlugin: 'nuxc-native',
        
        async transform(code: string, id: string) {
            // Utility: Vitest integration
            return { code };
        }
    };
}

export default createVitestPlugin;
