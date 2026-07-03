/**
 * @nuxc/plugin-markdown
 * Markdown processing
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createMarkdownPlugin(): PluginAdapter {
    return {
        name: '@nuxc/plugin-markdown',
        originalPlugin: 'nuxc-native',
        
        async transform(code: string, id: string) {
            // Utility: Markdown processing
            return { code };
        }
    };
}

export default createMarkdownPlugin;
