/**
 * @zeptr/plugin-cloudflare
 * Cloudflare Pages adapter
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createCloudflarePlugin(): PluginAdapter {
    return {
        name: '@zeptr/plugin-cloudflare',
        originalPlugin: 'zeptr-native',
        
        async buildEnd() {
            console.log('[@zeptr/plugin-cloudflare] Deployment adapter ready');
            // Generate deployment config
        }
    };
}

export default createCloudflarePlugin;
