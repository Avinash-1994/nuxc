# Migrating from Vite to Nuxc

Nuxc is designed to be a fast replacement for Vite.

## 1. Quick Switch
Run the auto-migration command:
```bash
npx nuxc migrate
```

## 2. Manual Migration

### Update scripts
Change your content in `package.json`:
```json
"scripts": {
  "dev": "nuxc dev",
  "build": "nuxc build"
}
```

### Reuse Vite Plugins
Nuxc can reuse many Vite-compatible plugins through compatibility adapters.

```ts
// nuxc.config.ts
import { defineConfig } from 'nuxc';
import { rollupAdapter } from '@nuxc/plugin-compat';
import someVitePlugin from 'vite-plugin-cool';

export default defineConfig({
  plugins: [
    rollupAdapter(someVitePlugin())
  ]
});
```

## 3. Environment Variables
Nuxc respects `.env` files exactly like Vite. Use `import.meta.env` as usual.

## 4. Key Differences
| Feature | Vite | Nuxc |
|---------|------|-------|
| Startup | ~400ms | < 50ms |
| Build | esbuild/Rollup | Native Rust |
| HMR | Fast | Instant (Delta Cache) |
