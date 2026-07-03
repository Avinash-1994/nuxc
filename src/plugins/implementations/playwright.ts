/**
 * @nuxc/plugin-playwright
 * Playwright E2E
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createPlaywrightPlugin(): PluginAdapter {
    return {
        name: '@nuxc/plugin-playwright',
        originalPlugin: 'nuxc-native',
        
        async transform(code: string, id: string) {
            // Utility: Playwright E2E
            return { code };
        }
    };
}

export default createPlaywrightPlugin;
