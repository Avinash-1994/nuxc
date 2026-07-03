/**
 * @zeptr/plugin-robots
 * Robots.txt generation
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createRobotsPlugin(): PluginAdapter {
    return {
        name: '@zeptr/plugin-robots',
        originalPlugin: 'zeptr-native',
        
        async transform(code: string, id: string) {
            // Utility: Robots.txt generation
            return { code };
        }
    };
}

export default createRobotsPlugin;
