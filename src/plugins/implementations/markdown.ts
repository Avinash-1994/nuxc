/**
 * @nuxco/plugin-markdown
 * Markdown processing
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createMarkdownPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-markdown',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // Utility: Markdown processing
            return { code };
        }
    };
}

export default createMarkdownPlugin;
