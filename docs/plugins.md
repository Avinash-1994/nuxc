# Nuce Plugins Guide

> **Plugin ecosystem with sandboxing support and WebCrypto signing support.**

---

## Quick Start

```bash
# Search for plugins
nuce plugin search react

# Install a plugin
nuce plugin install @nuce/plugin-react

# List installed plugins
nuce plugin list

# Verify plugin signatures
nuce plugin verify @nuce/plugin-react
```

---

## Using Plugins

### In `nuce.config.ts`

```typescript
import { defineConfig } from 'nuce';
import react from '@nuce/plugin-react';
import tailwind from '@nuce/plugin-tailwind';
import pwa from '@nuce/plugin-pwa';

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
| `@nuce/plugin-react` | React Fast Refresh + JSX | `nuce plugin install @nuce/plugin-react` |
| `@nuce/plugin-vue` | Vue 3 SFC support | `nuce plugin install @nuce/plugin-vue` |
| `@nuce/plugin-svelte` | Svelte compiler | `nuce plugin install @nuce/plugin-svelte` |
| `@nuce/plugin-solid` | Solid.js JSX | `nuce plugin install @nuce/plugin-solid` |
| `@nuce/plugin-angular` | Angular AOT compiler | `nuce plugin install @nuce/plugin-angular` |
| `@nuce/plugin-preact` | Preact with Fast Refresh | `nuce plugin install @nuce/plugin-preact` |

### CSS & Styling

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-tailwind` | Tailwind CSS v3+ | `nuce plugin install @nuce/plugin-tailwind` |
| `@nuce/plugin-sass` | Sass/SCSS compiler | `nuce plugin install @nuce/plugin-sass` |
| `@nuce/plugin-less` | Less compiler | `nuce plugin install @nuce/plugin-less` |
| `@nuce/plugin-postcss` | PostCSS processor | `nuce plugin install @nuce/plugin-postcss` |
| `@nuce/plugin-styled-components` | CSS-in-JS support | `nuce plugin install @nuce/plugin-styled-components` |
| `@nuce/plugin-emotion` | Emotion CSS-in-JS | `nuce plugin install @nuce/plugin-emotion` |

### Assets & Media

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-svgr` | SVG to React components | `nuce plugin install @nuce/plugin-svgr` |
| `@nuce/plugin-image-optimizer` | Image compression | `nuce plugin install @nuce/plugin-image-optimizer` |
| `@nuce/plugin-webp` | WebP conversion | `nuce plugin install @nuce/plugin-webp` |
| `@nuce/plugin-fonts` | Font optimization | `nuce plugin install @nuce/plugin-fonts` |

### Performance

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-compression` | Gzip/Brotli compression | `nuce plugin install @nuce/plugin-compression` |
| `@nuce/plugin-preload` | Resource preloading | `nuce plugin install @nuce/plugin-preload` |
| `@nuce/plugin-lazy-load` | Code splitting helpers | `nuce plugin install @nuce/plugin-lazy-load` |
| `@nuce/plugin-bundle-analyzer` | Bundle size analysis | `nuce plugin install @nuce/plugin-bundle-analyzer` |

### Security

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-csp` | Content Security Policy | `nuce plugin install @nuce/plugin-csp` |
| `@nuce/plugin-sri` | Subresource Integrity | `nuce plugin install @nuce/plugin-sri` |
| `@nuce/plugin-security-headers` | HTTP security headers | `nuce plugin install @nuce/plugin-security-headers` |

### Testing

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-vitest` | Vitest integration | `nuce plugin install @nuce/plugin-vitest` |
| `@nuce/plugin-jest` | Jest integration | `nuce plugin install @nuce/plugin-jest` |
| `@nuce/plugin-playwright` | E2E testing | `nuce plugin install @nuce/plugin-playwright` |

### i18n

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-i18next` | i18next integration | `nuce plugin install @nuce/plugin-i18next` |
| `@nuce/plugin-react-intl` | React Intl | `nuce plugin install @nuce/plugin-react-intl` |
| `@nuce/plugin-vue-i18n` | Vue I18n | `nuce plugin install @nuce/plugin-vue-i18n` |

### State Management

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-redux` | Redux DevTools | `nuce plugin install @nuce/plugin-redux` |
| `@nuce/plugin-zustand` | Zustand integration | `nuce plugin install @nuce/plugin-zustand` |
| `@nuce/plugin-jotai` | Jotai atoms | `nuce plugin install @nuce/plugin-jotai` |

### Deployment

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-vercel` | Vercel deployment | `nuce plugin install @nuce/plugin-vercel` |
| `@nuce/plugin-netlify` | Netlify deployment | `nuce plugin install @nuce/plugin-netlify` |
| `@nuce/plugin-cloudflare` | Cloudflare Workers | `nuce plugin install @nuce/plugin-cloudflare` |
| `@nuce/plugin-docker` | Docker containerization | `nuce plugin install @nuce/plugin-docker` |

### Analytics

| Plugin | Description | Install |
|--------|-------------|---------|
| `@nuce/plugin-google-analytics` | GA4 integration | `nuce plugin install @nuce/plugin-google-analytics` |
| `@nuce/plugin-plausible` | Plausible Analytics | `nuce plugin install @nuce/plugin-plausible` |
| `@nuce/plugin-sentry` | Error tracking | `nuce plugin install @nuce/plugin-sentry` |

---

## Plugin Security

### Plugin Security Model

Nuce currently executes plugins in an isolated VM-based runtime with strict permission controls. A secure WASM runtime for plugin execution is planned, but the current model is based on runtime isolation and API safety checks.

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
nuce plugin verify @nuce/plugin-react

# Output:
✅ Signature valid
✅ Publisher: Nuce Team
✅ Published: 2026-01-15
✅ SHA-256: a3f2...
```

### Plugin Manifest

```json
{
  "name": "@nuce/plugin-react",
  "version": "2.0.0",
  "author": "Nuce Team",
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
import { NucePlugin } from 'nuce';

export default function myPlugin(options = {}): NucePlugin {
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
export interface NucePlugin {
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
import { NucePlugin } from 'nuce';
import { marked } from 'marked';

export default function markdownPlugin(): NucePlugin {
  return {
    name: 'nuce-plugin-markdown',
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
// nuce.config.ts
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
import { defineConfig } from 'nuce';
import { rollupAdapter } from '@nuce/plugin-compat';
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
import { webpackLoaderAdapter } from '@nuce/plugin-compat';

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
nuce plugin list --all

# Search by category
nuce plugin search --category framework

# Filter by verified
nuce plugin search --verified
```

### Plugin Ratings

```bash
# View plugin details
nuce plugin info @nuce/plugin-react

# Output:
📦 @nuce/plugin-react v2.0.0
⭐ 4.8/5.0 (1,234 reviews)
📥 50,000 downloads/week
✅ Verified by Nuce Team
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
npm uninstall @nuce/plugin-name
nuce plugin install @nuce/plugin-name

# Or skip verification (not recommended)
nuce plugin install @nuce/plugin-name --skip-verify
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
import react from '@nuce/plugin-react';
```

⚠️ **Avoid** (unless necessary):
```typescript
import react from 'some-unofficial-plugin';
```

### 2. Verify Plugin Signatures

```bash
# Always verify before using
nuce plugin verify @nuce/plugin-name
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
nuce build --profile

# Output shows plugin timings
```

---

## Plugin Development

### Publishing a Plugin

```bash
# 1. Build plugin
npm run build

# 2. Sign plugin
nuce plugin sign ./dist

# 3. Publish to marketplace
nuce plugin publish

# 4. Verify published
nuce plugin verify @your-org/your-plugin
```

### Plugin Testing

```typescript
// plugin.test.ts
import { describe, it, expect } from '@nuce/test';
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
