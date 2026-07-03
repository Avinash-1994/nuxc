# Migrating from Vite to Zeptr

Zeptr is designed to be a fast replacement for Vite.

## 1. Quick Switch
Run the auto-migration command:
```bash
npx zeptr migrate
```

## 2. Manual Migration

### Update scripts
Change your content in `package.json`:
```json
"scripts": {
  "dev": "zeptr dev",
  "build": "zeptr build"
}
```

### Reuse Vite Plugins
Zeptr can reuse many Vite-compatible plugins through compatibility adapters.

```ts
// zeptr.config.ts
import { defineConfig } from 'zeptr';
import { rollupAdapter } from '@zeptr/plugin-compat';
import someVitePlugin from 'vite-plugin-cool';

export default defineConfig({
  plugins: [
    rollupAdapter(someVitePlugin())
  ]
});
```

## 3. Environment Variables
Zeptr respects `.env` files exactly like Vite. Use `import.meta.env` as usual.

## 4. Key Differences
| Feature | Vite | Zeptr |
|---------|------|-------|
| Startup | ~400ms | < 50ms |
| Build | esbuild/Rollup | Native Rust |
| HMR | Fast | Instant (Delta Cache) |
