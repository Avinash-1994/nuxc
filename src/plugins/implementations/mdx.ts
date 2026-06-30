/**
 * @nuce/plugin-mdx
 * MDX support
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createMdxPlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-mdx',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // Utility: MDX support
            return { code };
        }
    };
}

export default createMdxPlugin;
