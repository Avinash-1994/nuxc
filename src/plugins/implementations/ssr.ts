/**
 * @nuxco/plugin-ssr
 * Universal SSR support
 * Nuxco-native
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createSsrPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-ssr',
        originalPlugin: 'nuxco-native',
        
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
