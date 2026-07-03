User Guide — Nuxc Build Tool (plain language)

Who this guide is for
- New developers who have used `npm`/`node` and want a fast way to build frontend apps.

What this tool gives you
- Dev server with live reload
- Fast production build with caching
- Plugin system for extensions

Basic workflow:
- **Dev**: Run `npx nuxc dev`, see browser update via fast HMR.
- **Audit**: Run `npx nuxc verify` to check project health.
- **Build**: Run `npx nuxc build` for a production-ready bundle.
- **Analyze**: Run `npx nuxc analyze` to see bundle composition.

Files and folders you need to know
- `src/` — Put your app code here.
- `public/` — Static files like `index.html`.
- `build_output/` — Optimized production files.
- `.nuxc_cache/` — Native build database (SQLite).
- `nuxc.config.js` — Standard ESM configuration file.

Example: add a simple app
1. Create `src/main.tsx`:
   <!-- sample content provided in template -->
2. Run dev server
   npx nuxc dev

Config file (`nuxc.config.js`) example:
```javascript
export default {
  entry: ['src/main.tsx'],
  mode: 'production',
  outDir: 'dist',
  plugins: []
};
```

Tips for beginners
- If the dev server doesn't refresh, check the terminal for errors.
- Deleting `.nuxc_cache/` forces a fresh build.
