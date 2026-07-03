/**
 * @nuxco/plugin-trpc
 * tRPC integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createTrpcPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-trpc',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: tRPC integration
            return { code };
        }
    };
}

export default createTrpcPlugin;
