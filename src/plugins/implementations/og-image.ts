/**
 * @nuce/plugin-og-image
 * Open Graph image generation
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createOgImagePlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-og-image',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // Utility: Open Graph image generation
            return { code };
        }
    };
}

export default createOgImagePlugin;
