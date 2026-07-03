# Zeptr Plugins Guide

> **Plugin ecosystem with sandboxing support and WebCrypto signing support.**

---

## Quick Start

```bash
# Search for plugins
zeptr plugin search react

# Install a plugin
zeptr plugin install @zeptr/plugin-react

# List installed plugins
zeptr plugin list

# Verify plugin signatures
zeptr plugin verify @zeptr/plugin-react
```

---

## Using Plugins

### In `zeptr.config.ts`

```typescript
import { defineConfig } from 'zeptr';
import react from '@zeptr/plugin-react';
import tailwind from '@zeptr/plugin-tailwind';
import pwa from '@zeptr/plugin-pwa';

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
| `@zeptr/plugin-react` | React Fast Refresh + JSX | `zeptr plugin install @zeptr/plugin-react` |
| `@zeptr/plugin-vue` | Vue 3 SFC support | `zeptr plugin install @zeptr/plugin-vue` |
| `@zeptr/plugin-svelte` | Svelte compiler | `zeptr plugin install @zeptr/plugin-svelte` |
| `@zeptr/plugin-solid` | Solid.js JSX | `zeptr plugin install @zeptr/plugin-solid` |
| `@zeptr/plugin-angular` | Angular AOT compiler | `zeptr plugin install @zeptr/plugin-angular` |
| `@zeptr/plugin-preact` | Preact with Fast Refresh | `zeptr plugin install @zeptr/plugin-preact` |

### CSS & Styling

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-tailwind` | Tailwind CSS v3+ | `zeptr plugin install @zeptr/plugin-tailwind` |
| `@zeptr/plugin-sass` | Sass/SCSS compiler | `zeptr plugin install @zeptr/plugin-sass` |
| `@zeptr/plugin-less` | Less compiler | `zeptr plugin install @zeptr/plugin-less` |
| `@zeptr/plugin-postcss` | PostCSS processor | `zeptr plugin install @zeptr/plugin-postcss` |
| `@zeptr/plugin-styled-components` | CSS-in-JS support | `zeptr plugin install @zeptr/plugin-styled-components` |
| `@zeptr/plugin-emotion` | Emotion CSS-in-JS | `zeptr plugin install @zeptr/plugin-emotion` |

### Assets & Media

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-svgr` | SVG to React components | `zeptr plugin install @zeptr/plugin-svgr` |
| `@zeptr/plugin-image-optimizer` | Image compression | `zeptr plugin install @zeptr/plugin-image-optimizer` |
| `@zeptr/plugin-webp` | WebP conversion | `zeptr plugin install @zeptr/plugin-webp` |
| `@zeptr/plugin-fonts` | Font optimization | `zeptr plugin install @zeptr/plugin-fonts` |

### Performance

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-compression` | Gzip/Brotli compression | `zeptr plugin install @zeptr/plugin-compression` |
| `@zeptr/plugin-preload` | Resource preloading | `zeptr plugin install @zeptr/plugin-preload` |
| `@zeptr/plugin-lazy-load` | Code splitting helpers | `zeptr plugin install @zeptr/plugin-lazy-load` |
| `@zeptr/plugin-bundle-analyzer` | Bundle size analysis | `zeptr plugin install @zeptr/plugin-bundle-analyzer` |

### Security

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-csp` | Content Security Policy | `zeptr plugin install @zeptr/plugin-csp` |
| `@zeptr/plugin-sri` | Subresource Integrity | `zeptr plugin install @zeptr/plugin-sri` |
| `@zeptr/plugin-security-headers` | HTTP security headers | `zeptr plugin install @zeptr/plugin-security-headers` |

### Testing

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-vitest` | Vitest integration | `zeptr plugin install @zeptr/plugin-vitest` |
| `@zeptr/plugin-jest` | Jest integration | `zeptr plugin install @zeptr/plugin-jest` |
| `@zeptr/plugin-playwright` | E2E testing | `zeptr plugin install @zeptr/plugin-playwright` |

### i18n

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-i18next` | i18next integration | `zeptr plugin install @zeptr/plugin-i18next` |
| `@zeptr/plugin-react-intl` | React Intl | `zeptr plugin install @zeptr/plugin-react-intl` |
| `@zeptr/plugin-vue-i18n` | Vue I18n | `zeptr plugin install @zeptr/plugin-vue-i18n` |

### State Management

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-redux` | Redux DevTools | `zeptr plugin install @zeptr/plugin-redux` |
| `@zeptr/plugin-zustand` | Zustand integration | `zeptr plugin install @zeptr/plugin-zustand` |
| `@zeptr/plugin-jotai` | Jotai atoms | `zeptr plugin install @zeptr/plugin-jotai` |

### Deployment

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-vercel` | Vercel deployment | `zeptr plugin install @zeptr/plugin-vercel` |
| `@zeptr/plugin-netlify` | Netlify deployment | `zeptr plugin install @zeptr/plugin-netlify` |
| `@zeptr/plugin-cloudflare` | Cloudflare Workers | `zeptr plugin install @zeptr/plugin-cloudflare` |
| `@zeptr/plugin-docker` | Docker containerization | `zeptr plugin install @zeptr/plugin-docker` |

### Analytics

| Plugin | Description | Install |
|--------|-------------|---------|
| `@zeptr/plugin-google-analytics` | GA4 integration | `zeptr plugin install @zeptr/plugin-google-analytics` |
| `@zeptr/plugin-plausible` | Plausible Analytics | `zeptr plugin install @zeptr/plugin-plausible` |
| `@zeptr/plugin-sentry` | Error tracking | `zeptr plugin install @zeptr/plugin-sentry` |

---

## Plugin Security

### Plugin Security Model

Zeptr currently executes plugins in an isolated VM-based runtime with strict permission controls. A secure WASM runtime for plugin execution is planned, but the current model is based on runtime isolation and API safety checks.

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
zeptr plugin verify @zeptr/plugin-react

# Output:
✅ Signature valid
✅ Publisher: Zeptr Team
✅ Published: 2026-01-15
✅ SHA-256: a3f2...
```

### Plugin Manifest

```json
{
  "name": "@zeptr/plugin-react",
  "version": "2.0.0",
  "author": "Zeptr Team",
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
import { ZeptrPlugin } from 'zeptr';

export default function myPlugin(options = {}): ZeptrPlugin {
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
export interface ZeptrPlugin {
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
import { ZeptrPlugin } from 'zeptr';
import { marked } from 'marked';

export default function markdownPlugin(): ZeptrPlugin {
  return {
    name: 'zeptr-plugin-markdown',
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
// zeptr.config.ts
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
import { defineConfig } from 'zeptr';
import { rollupAdapter } from '@zeptr/plugin-compat';
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
import { webpackLoaderAdapter } from '@zeptr/plugin-compat';

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
zeptr plugin list --all

# Search by category
zeptr plugin search --category framework

# Filter by verified
zeptr plugin search --verified
```

### Plugin Ratings

```bash
# View plugin details
zeptr plugin info @zeptr/plugin-react

# Output:
📦 @zeptr/plugin-react v2.0.0
⭐ 4.8/5.0 (1,234 reviews)
📥 50,000 downloads/week
✅ Verified by Zeptr Team
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
npm uninstall @zeptr/plugin-name
zeptr plugin install @zeptr/plugin-name

# Or skip verification (not recommended)
zeptr plugin install @zeptr/plugin-name --skip-verify
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
import react from '@zeptr/plugin-react';
```

⚠️ **Avoid** (unless necessary):
```typescript
import react from 'some-unofficial-plugin';
```

### 2. Verify Plugin Signatures

```bash
# Always verify before using
zeptr plugin verify @zeptr/plugin-name
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
zeptr build --profile

# Output shows plugin timings
```

---

## Plugin Development

### Publishing a Plugin

```bash
# 1. Build plugin
npm run build

# 2. Sign plugin
zeptr plugin sign ./dist

# 3. Publish to marketplace
zeptr plugin publish

# 4. Verify published
zeptr plugin verify @your-org/your-plugin
```

### Plugin Testing

```typescript
// plugin.test.ts
import { describe, it, expect } from '@zeptr/test';
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
