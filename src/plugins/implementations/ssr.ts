/**
 * @nuce/plugin-ssr
 * Universal SSR support
 * Nuce-native
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createSsrPlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-ssr',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // ssr transformation
            if (id.endsWith('.js')) {
                // Add ssr runtime
                const transformed = `
// ssr HMR Runtime
if (import.meta.hot) {
    import.meta.hot.accept();
}

${code}
                `;
                return { code: transformed };
            }
            return { code };
        },

        async resolveId(source: string) {
            // Resolve ssr imports
            if (source.startsWith('ssr')) {
                return { id: source, external: false };
            }
            return null;
        }
    };
}

export default createSsrPlugin;
