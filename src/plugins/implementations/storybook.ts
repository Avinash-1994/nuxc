/**
 * @nuxc/plugin-storybook
 * Storybook integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createStorybookPlugin(): PluginAdapter {
    return {
        name: '@nuxc/plugin-storybook',
        originalPlugin: 'nuxc-native',
        
        async transform(code: string, id: string) {
            // Utility: Storybook integration
            return { code };
        }
    };
}

export default createStorybookPlugin;
