/**
 * @zeptr/plugin-vercel
 * Vercel deployment adapter
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createVercelPlugin(): PluginAdapter {
    return {
        name: '@zeptr/plugin-vercel',
        originalPlugin: 'zeptr-native',
        
        async buildEnd() {
            console.log('[@zeptr/plugin-vercel] Deployment adapter ready');
            // Generate deployment config
        }
    };
}

export default createVercelPlugin;
