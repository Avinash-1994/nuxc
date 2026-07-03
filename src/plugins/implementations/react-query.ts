/**
 * @nuxc/plugin-react-query
 * React Query integration
 * Nuxc-native
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createReactQueryPlugin(): PluginAdapter {
    return {
        name: '@nuxc/plugin-react-query',
        originalPlugin: 'nuxc-native',
        
        async transform(code: string, id: string) {
            // react transformation
            if (id.endsWith('.jsx')) {
                // Add react runtime
                const transformed = `
// react HMR Runtime
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
            // Resolve react imports
            if (source.startsWith('react')) {
                return { id: source, external: false };
            }
            return null;
        }
    };
}

export default createReactQueryPlugin;
