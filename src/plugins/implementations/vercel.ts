/**
 * @nuxco/plugin-vercel
 * Vercel deployment adapter
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createVercelPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-vercel',
        originalPlugin: 'nuxco-native',
        
        async buildEnd() {
            console.log('[@nuxco/plugin-vercel] Deployment adapter ready');
            // Generate deployment config
        }
    };
}

export default createVercelPlugin;
