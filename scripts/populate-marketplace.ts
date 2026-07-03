
/**
 * populate-marketplace.ts
 * Mass publishes 20 Core Plugins to local Zeptr Registry
 * Day 12: Curated Plugin Suite Lock
 */

import { MarketplaceClient } from '../src/marketplace/client.js';
import * as fs from 'fs';
import * as path from 'path';

const PLUGINS = [
    { name: '@zeptr/plugin-react', desc: 'Secure React Fast Refresh & JSX' },
    { name: '@zeptr/plugin-vue', desc: 'Vue 3 SFC Compiler (Sandboxed)' },
    { name: '@zeptr/plugin-svelte', desc: 'Svelte 5 Compiler & HMR' },
    { name: '@zeptr/plugin-solid', desc: 'SolidJS Fine-grained Reactivity' },
    { name: '@zeptr/plugin-lit', desc: 'Web Components & Lit Support' },
    { name: '@zeptr/plugin-angular', desc: 'Angular Ivy Compat' },
    { name: '@zeptr/plugin-postcss', desc: 'PostCSS 8 Adapter' },
    { name: '@zeptr/plugin-tailwindcss', desc: 'Tailwind JIT Engine' },
    { name: '@zeptr/plugin-sass', desc: 'Dart Sass (WASM)' },
    { name: '@zeptr/plugin-less', desc: 'Less CSS Support' },
    { name: '@zeptr/plugin-mdx', desc: 'Markdown to JSX' },
    { name: '@zeptr/plugin-optimize-css', desc: 'CSS Minification' },
    { name: '@zeptr/plugin-terser', desc: 'JS Minification (Terser)' },
    { name: '@zeptr/plugin-visualizer', desc: 'Bundle Analysis UI' },
    { name: '@zeptr/plugin-audit', desc: 'Lighthouse & Performance Audit' },
    { name: '@zeptr/plugin-pwa', desc: 'PWA Manifest & Service Workers' },
    { name: '@zeptr/plugin-legacy', desc: 'Polyfills for older browsers' },
    { name: '@zeptr/plugin-compression', desc: 'Gzip/Brotli Compression' },
    { name: '@zeptr/plugin-inspector', desc: 'DevTools & Debugging Overlay' },
    { name: '@zeptr/plugin-wasm', desc: 'Native WASM Modules Support' }
];

const TEMP_DIR = path.resolve('.temp_plugins');

async function run() {
    console.log('🚀 Populating Marketplace with 20 Core Plugins...');
    fs.mkdirSync(TEMP_DIR, { recursive: true });

    let count = 0;
    const start = performance.now();

    for (const p of PLUGINS) {
        // Create Mock Binary (Header + random filler to be unique)
        const filler = Buffer.from(p.name);
        // Valid WASM Header: 00 61 73 6D 01 00 00 00
        const header = Buffer.from('0061736d01000000', 'hex');
        const binary = Buffer.concat([header, filler]);

        const filePath = path.join(TEMP_DIR, `${p.name.replace('/', '_')}.wasm`);
        fs.writeFileSync(filePath, binary);

        const meta = {
            name: p.name,
            version: '1.0.0',
            author: 'Zeptr Core Team',
            description: p.desc,
            permissions: { network: false, fs: false } // Zero-trust default
        };

        try {
            await MarketplaceClient.publish(filePath, meta);
            count++;
        } catch (e: any) {
            console.error(`Failed to publish ${p.name}:`, e.message);
        }
    }

    // Cleanup
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });

    const totalTime = performance.now() - start;
    console.log(`\n✅ Published ${count}/${PLUGINS.length} plugins in ${totalTime.toFixed(2)}ms`);
    console.log(`⚡ Average: ${(totalTime / count).toFixed(2)}ms/plugin`);
}

run().catch(e => console.error(e));
