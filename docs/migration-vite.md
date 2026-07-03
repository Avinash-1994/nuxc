# Migrating from Vite to Nuxco

Nuxco is designed to be a fast replacement for Vite.

## 1. Quick Switch
Run the auto-migration command:
```bash
npx nuxco migrate
```

## 2. Manual Migration

### Update scripts
Change your content in `package.json`:
```json
"scripts": {
  "dev": "nuxco dev",
  "build": "nuxco build"
}
```

### Reuse Vite Plugins
Nuxco can reuse many Vite-compatible plugins through compatibility adapters.

```ts
// nuxco.config.ts
import { defineConfig } from 'nuxco';
import { rollupAdapter } from '@nuxco/plugin-compat';
import someVitePlugin from 'vite-plugin-cool';

export default defineConfig({
  plugins: [
    rollupAdapter(someVitePlugin())
  ]
});
```

## 3. Environment Variables
Nuxco respects `.env` files exactly like Vite. Use `import.meta.env` as usual.

## 4. Key Differences
| Feature | Vite | Nuxco |
|---------|------|-------|
| Startup | ~400ms | < 50ms |
| Build | esbuild/Rollup | Native Rust |
| HMR | Fast | Instant (Delta Cache) |
