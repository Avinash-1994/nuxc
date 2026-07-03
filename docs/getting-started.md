# Getting Started with Nuxc

> Get from zero to a running app in **under 5 minutes**.

---

## Prerequisites

- **Node.js** ≥ 20 ([download](https://nodejs.org))
- **npm** ≥ 8 (bundled with Node.js)

---

## Step 1 — Install Nuxc

```bash
npm install -g nuxc
```

Verify the installation:

```bash
nuxc --version
# ⚡ nuxc v1.0.9
```

---

## Step 2 — Scaffold a New Project

Pick your framework:

```bash
# React + TypeScript (recommended)
nuxc bootstrap --name my-app --template react-ts

# Vue 3 + TypeScript
nuxc bootstrap --name my-app --template vue-ts

# Svelte + TypeScript
nuxc bootstrap --name my-app --template svelte-ts

# Vanilla TypeScript
nuxc bootstrap --name my-app --template vanilla-ts
```

This creates a `my-app/` directory with a working starter project.

---

## Step 3 — Start the Dev Server

```bash
cd my-app
nuxc dev
```

You should see:

```
⚡ Nuxc v1.0.9
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/

  ✔ Ready in 312ms
```

Open [http://localhost:3000](http://localhost:3000) in your browser. **HMR is active** — edit any file and changes appear instantly without a full reload.

---

## Step 4 — Production Build

```bash
nuxc build
```

Output goes to `./dist/`. The build is minified, tree-shaken, and ready to deploy.

---

## Step 5 — Preview the Production Build

```bash
nuxc preview
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
├── nuxc.config.js    ← Nuxc configuration
└── package.json
```

---

## Minimal Configuration

The scaffolded `nuxc.config.js` works out of the box:

```js
// nuxc.config.js
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

If you already have a project, you can add Nuxc without scaffolding:

```bash
# Install locally
npm install --save-dev nuxc

# Generate a config file
npx nuxc init
```

Then update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "nuxc dev",
    "build": "nuxc build",
    "preview": "nuxc preview"
  }
}
```

---

## CLI Reference

```bash
nuxc dev                            # Start dev server with HMR
nuxc build                          # Production build
nuxc preview                        # Preview production build
nuxc bootstrap --name n --template t  # Scaffold new project
nuxc init                           # Generate nuxc.config.js
nuxc inspect                        # Inspect module graph
nuxc analyze                        # Analyze bundle size
nuxc doctor                         # Diagnose common issues
```

---

## Next Steps

- 📖 [Configuration Reference](./guides/configuration.md) — all config options with types and defaults
- 🔌 [Plugin Guide](./plugins.md) — extend Nuxc with plugins
- 📦 [Module Federation](./guides/federation.md) — micro-frontend architecture
- 🔥 [HMR Guide](./HMR_IMPLEMENTATION_STATUS.md) — how HMR works and how to debug it
- 🚚 [Migration Guide](./migration.md) — moving from Vite or Webpack
- ❓ [Troubleshooting](./TROUBLESHOOTING.md) — common errors and fixes
