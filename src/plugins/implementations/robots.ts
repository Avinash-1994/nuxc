/**
 * @nuce/plugin-robots
 * Robots.txt generation
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createRobotsPlugin(): PluginAdapter {
    return {
        name: '@nuce/plugin-robots',
        originalPlugin: 'nuce-native',
        
        async transform(code: string, id: string) {
            // Utility: Robots.txt generation
            return { code };
        }
    };
}

export default createRobotsPlugin;
