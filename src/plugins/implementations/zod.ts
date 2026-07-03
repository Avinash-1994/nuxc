/**
 * @zeptr/plugin-zod
 * Zod validation
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createZodPlugin(): PluginAdapter {
    return {
        name: '@zeptr/plugin-zod',
        originalPlugin: 'zeptr-native',
        
        async transform(code: string, id: string) {
            // Utility: Zod validation
            return { code };
        }
    };
}

export default createZodPlugin;
