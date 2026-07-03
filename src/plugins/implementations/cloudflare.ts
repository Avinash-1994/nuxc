/**
 * @nuxco/plugin-cloudflare
 * Cloudflare Pages adapter
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createCloudflarePlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-cloudflare',
        originalPlugin: 'nuxco-native',
        
        async buildEnd() {
            console.log('[@nuxco/plugin-cloudflare] Deployment adapter ready');
            // Generate deployment config
        }
    };
}

export default createCloudflarePlugin;
