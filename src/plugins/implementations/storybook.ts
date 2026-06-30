/**
 * @nuce/plugin-storybook
 * Storybook integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createStorybookPlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-storybook',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // Utility: Storybook integration
            return { code };
        }
    };
}

export default createStorybookPlugin;
