/**
 * @nuxco/plugin-recoil
 * Recoil state management
 * Nuxco-native
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createRecoilPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-recoil',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // recoil transformation
            if (id.endsWith('.js')) {
                // Add recoil runtime
                const transformed = `
// recoil HMR Runtime
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
            // Resolve recoil imports
            if (source.startsWith('recoil')) {
                return { id: source, external: false };
            }
            return null;
        }
    };
}

export default createRecoilPlugin;
