/**
 * @nuce/plugin-trpc
 * tRPC integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createTrpcPlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-trpc',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // Utility: tRPC integration
            return { code };
        }
    };
}

export default createTrpcPlugin;
