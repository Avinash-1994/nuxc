/**
 * @nuce/plugin-relay
 * Relay integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createRelayPlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-relay',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // Utility: Relay integration
            return { code };
        }
    };
}

export default createRelayPlugin;
