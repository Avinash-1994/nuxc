import { Plugin } from '../index.js';

/**
 * NUXCO TIER C PLUGINS (Graph-Aware / HMR)
 * 
 * Since Nuxco v1.0 handles HMR natively via UniversalTransformer for React, Vue, and Svelte,
 * these plugins act as compatibility wrappers or configuration providers.
 * 
 * They ensure that if a user migrates from Vite, they can map existing plugins to these
 * without breaking the build, while Nuxco's core engine handles the heavy lifting.
 */

interface ReactOptions {
    include?: string | RegExp | (string | RegExp)[];
    exclude?: string | RegExp | (string | RegExp)[];
    fastRefresh?: boolean;
    babel?: any;
}

/**
 * Nuxco React Plugin
 * Compatible with @vitejs/plugin-react
 */
export function nuxcoReact(options: ReactOptions = {}): Plugin {
    return {
        name: 'nuxco-react',
        setup(api) {
            // In the future, we can push options to the UniversalTransformer via API
            // For now, we log that React support is active.
        },
        buildStart() {
            // Validate environment
            if (process.env.NODE_ENV === 'development' && options.fastRefresh !== false) {
                // UniversalTransformer handles this automatically
            }
        }
    };
}

interface VueOptions {
    include?: string | RegExp | (string | RegExp)[];
    exclude?: string | RegExp | (string | RegExp)[];
    isProduction?: boolean;
}

/**
 * Nuxco Vue Plugin
 * Compatible with @vitejs/plugin-vue
 */
export function nuxcoVue(options: VueOptions = {}): Plugin {
    return {
        name: 'nuxco-vue',
        setup() {
            // Vue support is built-in
        }
    };
}

interface SvelteOptions {
    include?: string | RegExp | (string | RegExp)[];
    exclude?: string | RegExp | (string | RegExp)[];
    preprocess?: any;
}

/**
 * Nuxco Svelte Plugin
 * Compatible with @sveltejs/vite-plugin-svelte
 */
export function nuxcoSvelte(options: SvelteOptions = {}): Plugin {
    return {
        name: 'nuxco-svelte',
        setup() {
            // Svelte support is built-in
        }
    };
}

/**
 * Compatibility aliases
 */
export const nuxcoReactRefresh = nuxcoReact;
export const nuxcoVueHmr = nuxcoVue;
export const nuxcoSvelteHmr = nuxcoSvelte;
