/**
 * @nuxco/plugin-zustand
 * Zustand state management
 * Nuxco-native
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createZustandPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-zustand',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // zustand transformation
            if (id.endsWith('.js')) {
                // Add zustand runtime
                const transformed = `
// zustand HMR Runtime
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
            // Resolve zustand imports
            if (source.startsWith('zustand')) {
                return { id: source, external: false };
            }
            return null;
        }
    };
}

export default createZustandPlugin;
