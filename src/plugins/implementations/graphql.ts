/**
 * @zeptr/plugin-graphql
 * GraphQL integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createGraphqlPlugin(): PluginAdapter {
    return {
        name: '@zeptr/plugin-graphql',
        originalPlugin: 'zeptr-native',
        
        async transform(code: string, id: string) {
            // Utility: GraphQL integration
            return { code };
        }
    };
}

export default createGraphqlPlugin;
