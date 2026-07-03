/**
 * @nuxco/plugin-vitest
 * Vitest integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createVitestPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-vitest',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: Vitest integration
            return { code };
        }
    };
}

export default createVitestPlugin;
