# Nuxc Plugins Guide

> **Plugin ecosystem with sandboxing support and WebCrypto signing support.**

---

## Quick Start

```bash
# Search for plugins
nuxc plugin search react

# Install a plugin
nuxc plugin install @nuxc/plugin-react

# List installed plugins
nuxc plugin list

# Verify plugin signatures
nuxc plugin verify @nuxc/plugin-react
```

---

## Using Plugins

### In `nuxc.config.ts`

```typescript
import { defineConfig } from 'nuxc';
import react from '@nuxc/plugin-react';
import tailwind from '@nuxc/plugin-tailwind';
import pwa from '@nuxc/plugin-pwa';

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
| `@nuxc/plugin-react` | React Fast Refresh + JSX | `nuxc plugin install @nuxc/plugin-react` |
| `@nuxc/plugin-vue` | Vue 3 SFC support | `nuxc plugin install @nuxc/plugin-vue` |
| `@nuxc/plugin-svelte` | Svelte compiler | `nuxc plugin install @nuxc/plugin-svelte` |
| `@nuxc/plugin-solid` | Solid.js JSX | `nuxc plugin install @nuxc/plugin-solid` |
| `@nuxc/plugin-angular` | Angular AOT compiler | `nuxc plugin install @nuxc/plugin-angular` |
| `@nuxc/plugin-preact` | Preact with Fast Refresh | `nuxc plugin install @nuxc/plugin-preact` |

### CSS & Styling

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-tailwind` | Tailwind CSS v3+ | `nuxc plugin install @nuxc/plugin-tailwind` |
| `@nuxc/plugin-sass` | Sass/SCSS compiler | `nuxc plugin install @nuxc/plugin-sass` |
| `@nuxc/plugin-less` | Less compiler | `nuxc plugin install @nuxc/plugin-less` |
| `@nuxc/plugin-postcss` | PostCSS processor | `nuxc plugin install @nuxc/plugin-postcss` |
| `@nuxc/plugin-styled-components` | CSS-in-JS support | `nuxc plugin install @nuxc/plugin-styled-components` |
| `@nuxc/plugin-emotion` | Emotion CSS-in-JS | `nuxc plugin install @nuxc/plugin-emotion` |

### Assets & Media

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-svgr` | SVG to React components | `nuxc plugin install @nuxc/plugin-svgr` |
| `@nuxc/plugin-image-optimizer` | Image compression | `nuxc plugin install @nuxc/plugin-image-optimizer` |
| `@nuxc/plugin-webp` | WebP conversion | `nuxc plugin install @nuxc/plugin-webp` |
| `@nuxc/plugin-fonts` | Font optimization | `nuxc plugin install @nuxc/plugin-fonts` |

### Performance

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-compression` | Gzip/Brotli compression | `nuxc plugin install @nuxc/plugin-compression` |
| `@nuxc/plugin-preload` | Resource preloading | `nuxc plugin install @nuxc/plugin-preload` |
| `@nuxc/plugin-lazy-load` | Code splitting helpers | `nuxc plugin install @nuxc/plugin-lazy-load` |
| `@nuxc/plugin-bundle-analyzer` | Bundle size analysis | `nuxc plugin install @nuxc/plugin-bundle-analyzer` |

### Security

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-csp` | Content Security Policy | `nuxc plugin install @nuxc/plugin-csp` |
| `@nuxc/plugin-sri` | Subresource Integrity | `nuxc plugin install @nuxc/plugin-sri` |
| `@nuxc/plugin-security-headers` | HTTP security headers | `nuxc plugin install @nuxc/plugin-security-headers` |

### Testing

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-vitest` | Vitest integration | `nuxc plugin install @nuxc/plugin-vitest` |
| `@nuxc/plugin-jest` | Jest integration | `nuxc plugin install @nuxc/plugin-jest` |
| `@nuxc/plugin-playwright` | E2E testing | `nuxc plugin install @nuxc/plugin-playwright` |

### i18n

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-i18next` | i18next integration | `nuxc plugin install @nuxc/plugin-i18next` |
| `@nuxc/plugin-react-intl` | React Intl | `nuxc plugin install @nuxc/plugin-react-intl` |
| `@nuxc/plugin-vue-i18n` | Vue I18n | `nuxc plugin install @nuxc/plugin-vue-i18n` |

### State Management

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-redux` | Redux DevTools | `nuxc plugin install @nuxc/plugin-redux` |
| `@nuxc/plugin-zustand` | Zustand integration | `nuxc plugin install @nuxc/plugin-zustand` |
| `@nuxc/plugin-jotai` | Jotai atoms | `nuxc plugin install @nuxc/plugin-jotai` |

### Deployment

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-vercel` | Vercel deployment | `nuxc plugin install @nuxc/plugin-vercel` |
| `@nuxc/plugin-netlify` | Netlify deployment | `nuxc plugin install @nuxc/plugin-netlify` |
| `@nuxc/plugin-cloudflare` | Cloudflare Workers | `nuxc plugin install @nuxc/plugin-cloudflare` |
| `@nuxc/plugin-docker` | Docker containerization | `nuxc plugin install @nuxc/plugin-docker` |

### Analytics

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuxc/plugin-google-analytics` | GA4 integration | `nuxc plugin install @nuxc/plugin-google-analytics` |
| `@nuxc/plugin-plausible` | Plausible Analytics | `nuxc plugin install @nuxc/plugin-plausible` |
| `@nuxc/plugin-sentry` | Error tracking | `nuxc plugin install @nuxc/plugin-sentry` |

---

## Plugin Security

### Plugin Security Model

Nuxc currently executes plugins in an isolated VM-based runtime with strict permission controls. A secure WASM runtime for plugin execution is planned, but the current model is based on runtime isolation and API safety checks.

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
nuxc plugin verify @nuxc/plugin-react

# Output:
✅ Signature valid
✅ Publisher: Nuxc Team
✅ Published: 2026-01-15
✅ SHA-256: a3f2...
```

### Plugin Manifest

```json
{
  "name": "@nuxc/plugin-react",
  "version": "2.0.0",
  "author": "Nuxc Team",
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
import { NuxcPlugin } from 'nuxc';

export default function myPlugin(options = {}): NuxcPlugin {
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
export interface NuxcPlugin {
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
import { NuxcPlugin } from 'nuxc';
import { marked } from 'marked';

export default function markdownPlugin(): NuxcPlugin {
  return {
    name: 'nuxc-plugin-markdown',
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
// nuxc.config.ts
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
import { defineConfig } from 'nuxc';
import { rollupAdapter } from '@nuxc/plugin-compat';
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
import { webpackLoaderAdapter } from '@nuxc/plugin-compat';

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
nuxc plugin list --all

# Search by category
nuxc plugin search --category framework

# Filter by verified
nuxc plugin search --verified
```

### Plugin Ratings

```bash
# View plugin details
nuxc plugin info @nuxc/plugin-react

# Output:
📦 @nuxc/plugin-react v2.0.0
⭐ 4.8/5.0 (1,234 reviews)
📥 50,000 downloads/week
✅ Verified by Nuxc Team
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
npm uninstall @nuxc/plugin-name
nuxc plugin install @nuxc/plugin-name

# Or skip verification (not recommended)
nuxc plugin install @nuxc/plugin-name --skip-verify
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
import react from '@nuxc/plugin-react';
```

⚠️ **Avoid** (unless necessary):
```typescript
import react from 'some-unofficial-plugin';
```

### 2. Verify Plugin Signatures

```bash
# Always verify before using
nuxc plugin verify @nuxc/plugin-name
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
nuxc build --profile

# Output shows plugin timings
```

---

## Plugin Development

### Publishing a Plugin

```bash
# 1. Build plugin
npm run build

# 2. Sign plugin
nuxc plugin sign ./dist

# 3. Publish to marketplace
nuxc plugin publish

# 4. Verify published
nuxc plugin verify @your-org/your-plugin
```

### Plugin Testing

```typescript
// plugin.test.ts
import { describe, it, expect } from '@nuxc/test';
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
