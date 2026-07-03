# Getting Started with Zeptr

> Get from zero to a running app in **under 5 minutes**.

---

## Prerequisites

- **Node.js** ≥ 20 ([download](https://nodejs.org))
- **npm** ≥ 8 (bundled with Node.js)

---

## Step 1 — Install Zeptr

```bash
npm install -g zeptr
```

Verify the installation:

```bash
zeptr --version
# ⚡ zeptr v1.0.9
```

---

## Step 2 — Scaffold a New Project

Pick your framework:

```bash
# React + TypeScript (recommended)
zeptr bootstrap --name my-app --template react-ts

# Vue 3 + TypeScript
zeptr bootstrap --name my-app --template vue-ts

# Svelte + TypeScript
zeptr bootstrap --name my-app --template svelte-ts

# Vanilla TypeScript
zeptr bootstrap --name my-app --template vanilla-ts
```

This creates a `my-app/` directory with a working starter project.

---

## Step 3 — Start the Dev Server

```bash
cd my-app
zeptr dev
```

You should see:

```
⚡ Zeptr v1.0.9
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/

  ✔ Ready in 312ms
```

Open [http://localhost:3000](http://localhost:3000) in your browser. **HMR is active** — edit any file and changes appear instantly without a full reload.

---

## Step 4 — Production Build

```bash
zeptr build
```

Output goes to `./dist/`. The build is minified, tree-shaken, and ready to deploy.

---

## Step 5 — Preview the Production Build

```bash
zeptr preview
```

Serves the `dist/` folder locally so you can verify before deploying.

---

## Project Structure

After scaffolding, your project looks like this:

```
my-app/
├── src/
│   ├── main.tsx        ← Entry point
│   ├── App.tsx         ← Root component
│   └── index.css
├── index.html
├── zeptr.config.js    ← Zeptr configuration
└── package.json
```

---

## Minimal Configuration

The scaffolded `zeptr.config.js` works out of the box:

```js
// zeptr.config.js
module.exports = {
  entry: ['./src/main.tsx'],
  outDir: './dist',

  dev: {
    port: 3000,
    hmr: true,
  },

  build: {
    minify: true,
    sourcemap: 'external',
  },
};
```

> See the full [Configuration Reference](./guides/configuration.md) for all options.

---

## Adding to an Existing Project

If you already have a project, you can add Zeptr without scaffolding:

```bash
# Install locally
npm install --save-dev zeptr

# Generate a config file
npx zeptr init
```

Then update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "zeptr dev",
    "build": "zeptr build",
    "preview": "zeptr preview"
  }
}
```

---

## CLI Reference

```bash
zeptr dev                            # Start dev server with HMR
zeptr build                          # Production build
zeptr preview                        # Preview production build
zeptr bootstrap --name n --template t  # Scaffold new project
zeptr init                           # Generate zeptr.config.js
zeptr inspect                        # Inspect module graph
zeptr analyze                        # Analyze bundle size
zeptr doctor                         # Diagnose common issues
```

---

## Next Steps

- 📖 [Configuration Reference](./guides/configuration.md) — all config options with types and defaults
- 🔌 [Plugin Guide](./plugins.md) — extend Zeptr with plugins
- 📦 [Module Federation](./guides/federation.md) — micro-frontend architecture
- 🔥 [HMR Guide](./HMR_IMPLEMENTATION_STATUS.md) — how HMR works and how to debug it
- 🚚 [Migration Guide](./migration.md) — moving from Vite or Webpack
- ❓ [Troubleshooting](./TROUBLESHOOTING.md) — common errors and fixes
