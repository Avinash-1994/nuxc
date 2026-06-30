# Migrating from Vite to Nuce

Nuce is designed to be a fast replacement for Vite.

## 1. Quick Switch
Run the auto-migration command:
```bash
npx nuce migrate
```

## 2. Manual Migration

### Update scripts
Change your content in `package.json`:
```json
"scripts": {
  "dev": "nuce dev",
  "build": "nuce build"
}
```

### Reuse Vite Plugins
Nuce can reuse many Vite-compatible plugins through compatibility adapters.

```ts
// nuce.config.ts
import { defineConfig } from 'nuce';
import { rollupAdapter } from '@nuce/plugin-compat';
import someVitePlugin from 'vite-plugin-cool';

export default defineConfig({
  plugins: [
    rollupAdapter(someVitePlugin())
  ]
});
```

## 3. Environment Variables
Nuce respects `.env` files exactly like Vite. Use `import.meta.env` as usual.

## 4. Key Differences
| Feature | Vite | Nuce |
|---------|------|-------|
| Startup | ~400ms | < 50ms |
| Build | esbuild/Rollup | Native Rust |
| HMR | Fast | Instant (Delta Cache) |
