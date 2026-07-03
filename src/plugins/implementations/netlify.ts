/**
 * @nuxco/plugin-netlify
 * Netlify deployment adapter
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createNetlifyPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-netlify',
        originalPlugin: 'nuxco-native',
        
        async buildEnd() {
            console.log('[@nuxco/plugin-netlify] Deployment adapter ready');
            // Generate deployment config
        }
    };
}

export default createNetlifyPlugin;
