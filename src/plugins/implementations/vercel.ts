/**
 * @nuxc/plugin-vercel
 * Vercel deployment adapter
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createVercelPlugin(): PluginAdapter {
    return {
        name: '@nuxc/plugin-vercel',
        originalPlugin: 'nuxc-native',
        
        async buildEnd() {
            console.log('[@nuxc/plugin-vercel] Deployment adapter ready');
            // Generate deployment config
        }
    };
}

export default createVercelPlugin;
