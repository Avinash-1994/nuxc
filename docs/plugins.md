# Nuxco Plugins Guide

> **Plugin ecosystem with sandboxing support and WebCrypto signing support.**

---

## Quick Start

```bash
# Search for plugins
nuxco plugin search react

# Install a plugin
nuxco plugin install @nuxco/plugin-react

# List installed plugins
nuxco plugin list

# Verify plugin signatures
nuxco plugin verify @nuxco/plugin-react
```

---

## Using Plugins

### In `nuxco.config.ts`

```typescript
import { defineConfig } from 'nuxco';
import react from '@nuxco/plugin-react';
import tailwind from '@nuxco/plugin-tailwind';
import pwa from '@nuxco/plugin-pwa';

export default defineConfig({
  preset: 'spa',
  
  plugins: [
    react({
      fastRefresh: true,
      babel: {
        plugins: ['babel-plugin-styled-components']
      }
    }),
    
    tailwind({
      config: './tailwind.config.js'
    }),
    
    pwa({
      manifest: {
        name: 'My App',
        short_name: 'App',
        theme_color: '#000000'
      }
    })
  ]
});
```

---

## Plugin Categories

### Framework Plugins

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-react` | React Fast Refresh + JSX | `nuxco plugin install @nuxco/plugin-react` |
| `@nuxco/plugin-vue` | Vue 3 SFC support | `nuxco plugin install @nuxco/plugin-vue` |
| `@nuxco/plugin-svelte` | Svelte compiler | `nuxco plugin install @nuxco/plugin-svelte` |
| `@nuxco/plugin-solid` | Solid.js JSX | `nuxco plugin install @nuxco/plugin-solid` |
| `@nuxco/plugin-angular` | Angular AOT compiler | `nuxco plugin install @nuxco/plugin-angular` |
| `@nuxco/plugin-preact` | Preact with Fast Refresh | `nuxco plugin install @nuxco/plugin-preact` |

### CSS & Styling

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-tailwind` | Tailwind CSS v3+ | `nuxco plugin install @nuxco/plugin-tailwind` |
| `@nuxco/plugin-sass` | Sass/SCSS compiler | `nuxco plugin install @nuxco/plugin-sass` |
| `@nuxco/plugin-less` | Less compiler | `nuxco plugin install @nuxco/plugin-less` |
| `@nuxco/plugin-postcss` | PostCSS processor | `nuxco plugin install @nuxco/plugin-postcss` |
| `@nuxco/plugin-styled-components` | CSS-in-JS support | `nuxco plugin install @nuxco/plugin-styled-components` |
| `@nuxco/plugin-emotion` | Emotion CSS-in-JS | `nuxco plugin install @nuxco/plugin-emotion` |

### Assets & Media

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-svgr` | SVG to React components | `nuxco plugin install @nuxco/plugin-svgr` |
| `@nuxco/plugin-image-optimizer` | Image compression | `nuxco plugin install @nuxco/plugin-image-optimizer` |
| `@nuxco/plugin-webp` | WebP conversion | `nuxco plugin install @nuxco/plugin-webp` |
| `@nuxco/plugin-fonts` | Font optimization | `nuxco plugin install @nuxco/plugin-fonts` |

### Performance

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-compression` | Gzip/Brotli compression | `nuxco plugin install @nuxco/plugin-compression` |
| `@nuxco/plugin-preload` | Resource preloading | `nuxco plugin install @nuxco/plugin-preload` |
| `@nuxco/plugin-lazy-load` | Code splitting helpers | `nuxco plugin install @nuxco/plugin-lazy-load` |
| `@nuxco/plugin-bundle-analyzer` | Bundle size analysis | `nuxco plugin install @nuxco/plugin-bundle-analyzer` |

### Security

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-csp` | Content Security Policy | `nuxco plugin install @nuxco/plugin-csp` |
| `@nuxco/plugin-sri` | Subresource Integrity | `nuxco plugin install @nuxco/plugin-sri` |
| `@nuxco/plugin-security-headers` | HTTP security headers | `nuxco plugin install @nuxco/plugin-security-headers` |

### Testing

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-vitest` | Vitest integration | `nuxco plugin install @nuxco/plugin-vitest` |
| `@nuxco/plugin-jest` | Jest integration | `nuxco plugin install @nuxco/plugin-jest` |
| `@nuxco/plugin-playwright` | E2E testing | `nuxco plugin install @nuxco/plugin-playwright` |

### i18n

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-i18next` | i18next integration | `nuxco plugin install @nuxco/plugin-i18next` |
| `@nuxco/plugin-react-intl` | React Intl | `nuxco plugin install @nuxco/plugin-react-intl` |
| `@nuxco/plugin-vue-i18n` | Vue I18n | `nuxco plugin install @nuxco/plugin-vue-i18n` |

### State Management

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-redux` | Redux DevTools | `nuxco plugin install @nuxco/plugin-redux` |
| `@nuxco/plugin-zustand` | Zustand integration | `nuxco plugin install @nuxco/plugin-zustand` |
| `@nuxco/plugin-jotai` | Jotai atoms | `nuxco plugin install @nuxco/plugin-jotai` |

### Deployment

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-vercel` | Vercel deployment | `nuxco plugin install @nuxco/plugin-vercel` |
| `@nuxco/plugin-netlify` | Netlify deployment | `nuxco plugin install @nuxco/plugin-netlify` |
| `@nuxco/plugin-cloudflare` | Cloudflare Workers | `nuxco plugin install @nuxco/plugin-cloudflare` |
| `@nuxco/plugin-docker` | Docker containerization | `nuxco plugin install @nuxco/plugin-docker` |

### Analytics

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxco/plugin-google-analytics` | GA4 integration | `nuxco plugin install @nuxco/plugin-google-analytics` |
| `@nuxco/plugin-plausible` | Plausible Analytics | `nuxco plugin install @nuxco/plugin-plausible` |
| `@nuxco/plugin-sentry` | Error tracking | `nuxco plugin install @nuxco/plugin-sentry` |

---

## Plugin Security

### Plugin Security Model

Nuxco currently executes plugins in an isolated VM-based runtime with strict permission controls. A secure WASM runtime for plugin execution is planned, but the current model is based on runtime isolation and API safety checks.

Plugins are subject to explicit permissions:
- Filesystem access is denied by default and only granted for approved paths.
- Environment variables are only available when the plugin is loaded with an explicit env allowlist.
- `require()` is whitelisted to a small set of safe built-ins (`fs`, `path`) and all other module imports are blocked.
- Network access is blocked by default because no network globals are exposed in the sandbox (`fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` are removed).

```typescript
// Plugins SHOULD NOT:
❌ Access filesystem directly without permission
❌ Make network requests
❌ Execute arbitrary code
❌ Access environment variables unless explicitly allowed

// Plugins CAN:
✅ Transform code
✅ Generate assets
✅ Emit warnings/errors
✅ Use approved APIs
```
### Signature Verification

Every plugin is **cryptographically signed**:

```bash
# Verify plugin signature
nuxco plugin verify @nuxco/plugin-react

# Output:
✅ Signature valid
✅ Publisher: Nuxco Team
✅ Published: 2026-01-15
✅ SHA-256: a3f2...
```

### Plugin Manifest

```json
{
  "name": "@nuxco/plugin-react",
  "version": "2.0.0",
  "author": "Nuxco Team",
  "signature": "...",
  "permissions": [
    "transform:jsx",
    "emit:assets"
  ],
  "sandbox": "isolated",
  "verified": true
}
```

---

## Writing Custom Plugins

### Basic Plugin Structure

```typescript
// my-plugin.ts
import { NuxcoPlugin } from 'nuxco';

export default function myPlugin(options = {}): NuxcoPlugin {
  return {
    name: 'my-plugin',
    version: '1.0.0',
    
    // Transform hook
    transform(code, id) {
      if (id.endsWith('.custom')) {
        return {
          code: transformCode(code),
          map: generateSourceMap()
        };
      }
    },
    
    // Build start hook
    buildStart() {
      console.log('Build starting...');
    },
    
    // Build end hook
    buildEnd() {
      console.log('Build complete!');
    }
  };
}
```

### Plugin Hooks

```typescript
export interface NuxcoPlugin {
  name: string;
  version: string;
  
  // Lifecycle hooks
  buildStart?(): void;
  buildEnd?(): void;
  
  // Transform hooks
  transform?(code: string, id: string): TransformResult;
  load?(id: string): string | null;
  resolveId?(source: string, importer: string): string | null;
  
  // Asset hooks
  generateBundle?(bundle: Bundle): void;
  writeBundle?(bundle: Bundle): void;
  
  // Dev server hooks
  configureServer?(server: DevServer): void;
  handleHotUpdate?(ctx: HmrContext): void;
}
```

### Example: Custom Markdown Plugin

```typescript
import { NuxcoPlugin } from 'nuxco';
import { marked } from 'marked';

export default function markdownPlugin(): NuxcoPlugin {
  return {
    name: 'nuxco-plugin-markdown',
    version: '1.0.0',
    
    transform(code, id) {
      if (!id.endsWith('.md')) return null;
      
      const html = marked(code);
      
      return {
        code: `export default ${JSON.stringify(html)}`,
        map: null
      };
    }
  };
}
```

**Usage**:
```typescript
// nuxco.config.ts
import markdown from './my-plugin';

export default defineConfig({
  plugins: [markdown()]
});
```

```typescript
// app.tsx
import content from './README.md';

function App() {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
```

---

## Plugin Compatibility

### Vite Plugin Adapter

```typescript
import { defineConfig } from 'nuxco';
import { rollupAdapter } from '@nuxco/plugin-compat';
import viteReactSvgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    // Wrap Vite plugin
    rollupAdapter(viteReactSvgr())
  ]
});
```

**Compatibility**: Experimental and plugin-dependent; many Vite plugins can work with adapter

### Webpack Loader Adapter

```typescript
import { webpackLoaderAdapter } from '@nuxco/plugin-compat';

export default defineConfig({
  plugins: [
    webpackLoaderAdapter({
      test: /\.custom$/,
      loader: 'custom-loader',
      options: {}
    })
  ]
});
```

**Compatibility**: Experimental and plugin-dependent; many Webpack loaders can work with adapter

---

## Plugin Marketplace

### Browse Plugins

```bash
# List all plugins
nuxco plugin list --all

# Search by category
nuxco plugin search --category framework

# Filter by verified
nuxco plugin search --verified
```

### Plugin Ratings

```bash
# View plugin details
nuxco plugin info @nuxco/plugin-react

# Output:
📦 @nuxco/plugin-react v2.0.0
⭐ 4.8/5.0 (1,234 reviews)
📥 50,000 downloads/week
✅ Verified by Nuxco Team
🔒 Secure isolated plugin runtime
📝 React Fast Refresh + JSX transform
```

---

## Troubleshooting

### Plugin Not Loading

**Issue**: Plugin installed but not working

**Solution**:
```typescript
// Check plugin is in config
export default defineConfig({
  plugins: [
    myPlugin() // ← Make sure it's called as function
  ]
});
```

### Signature Verification Failed

**Issue**: `⚠️ Signature verification failed`

**Solution**:
```bash
# Re-install plugin
npm uninstall @nuxco/plugin-name
nuxco plugin install @nuxco/plugin-name

# Or skip verification (not recommended)
nuxco plugin install @nuxco/plugin-name --skip-verify
```

### Plugin Conflicts

**Issue**: Two plugins transforming same files

**Solution**: Use `enforce` option
```typescript
export default defineConfig({
  plugins: [
    pluginA({ enforce: 'pre' }),  // Runs first
    pluginB({ enforce: 'post' })  // Runs last
  ]
});
```

---

## Best Practices

### 1. Use Official Plugins First

✅ **Good**:
```typescript
import react from '@nuxco/plugin-react';
```

⚠️ **Avoid** (unless necessary):
```typescript
import react from 'some-unofficial-plugin';
```

### 2. Verify Plugin Signatures

```bash
# Always verify before using
nuxco plugin verify @nuxco/plugin-name
```

### 3. Minimal Plugin Configuration

✅ **Good**:
```typescript
plugins: [
  react() // Use defaults
]
```

⚠️ **Avoid**:
```typescript
plugins: [
  react({
    // Too many custom options = harder to maintain
  })
]
```

### 4. Check Plugin Performance

```bash
# Profile plugin impact
nuxco build --profile

# Output shows plugin timings
```

---

## Plugin Development

### Publishing a Plugin

```bash
# 1. Build plugin
npm run build

# 2. Sign plugin
nuxco plugin sign ./dist

# 3. Publish to marketplace
nuxco plugin publish

# 4. Verify published
nuxco plugin verify @your-org/your-plugin
```

### Plugin Testing

```typescript
// plugin.test.ts
import { describe, it, expect } from '@nuxco/test';
import myPlugin from './plugin';

describe('My Plugin', () => {
  it('should transform code', () => {
    const plugin = myPlugin();
    const result = plugin.transform('input', 'file.custom');
    
    expect(result.code).toContain('transformed');
  });
});
```

---

## Next Steps

- 📚 [Migration Guide](./migration.md) - Migrate existing projects
- 🚀 [Starter Templates](./starters.md) - Start with templates
- 📊 [Benchmarks](./benchmarks.md) - Performance comparisons
- 🔒 [Security Guide](./security.md) - Security best practices
