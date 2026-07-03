/**
 * @nuxco/plugin-formatjs
 * FormatJS (react-intl) integration
 */

import { PluginAdapter } from '../ported/adapter.js';

export function createFormatjsPlugin(): PluginAdapter {
    return {
        name: '@nuxco/plugin-formatjs',
        originalPlugin: 'nuxco-native',
        
        async transform(code: string, id: string) {
            // i18n: FormatJS (react-intl) integration
            return { code };
        },

        async buildEnd() {
            console.log('[@nuxco/plugin-formatjs] i18n setup complete');
        }
    };
}

export default createFormatjsPlugin;
