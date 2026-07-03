# Getting Started with Nuxco

> Get from zero to a running app in **under 5 minutes**.

---

## Prerequisites

- **Node.js** ≥ 20 ([download](https://nodejs.org))
- **npm** ≥ 8 (bundled with Node.js)

---

## Step 1 — Install Nuxco

```bash
npm install -g nuxco
```

Verify the installation:

```bash
nuxco --version
# ⚡ nuxco v1.0.9
```

---

## Step 2 — Scaffold a New Project

Pick your framework:

```bash
# React + TypeScript (recommended)
nuxco bootstrap --name my-app --template react-ts

# Vue 3 + TypeScript
nuxco bootstrap --name my-app --template vue-ts

# Svelte + TypeScript
nuxco bootstrap --name my-app --template svelte-ts

# Vanilla TypeScript
nuxco bootstrap --name my-app --template vanilla-ts
```

This creates a `my-app/` directory with a working starter project.

---

## Step 3 — Start the Dev Server

```bash
cd my-app
nuxco dev
```

You should see:

```
⚡ Nuxco v1.0.9
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/

  ✔ Ready in 312ms
```

Open [http://localhost:3000](http://localhost:3000) in your browser. **HMR is active** — edit any file and changes appear instantly without a full reload.

---

## Step 4 — Production Build

```bash
nuxco build
```

Output goes to `./dist/`. The build is minified, tree-shaken, and ready to deploy.

---

## Step 5 — Preview the Production Build

```bash
nuxco preview
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
├── nuxco.config.js    ← Nuxco configuration
└── package.json
```

---

## Minimal Configuration

The scaffolded `nuxco.config.js` works out of the box:

```js
// nuxco.config.js
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

If you already have a project, you can add Nuxco without scaffolding:

```bash
# Install locally
npm install --save-dev nuxco

# Generate a config file
npx nuxco init
```

Then update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "nuxco dev",
    "build": "nuxco build",
    "preview": "nuxco preview"
  }
}
```

---

## CLI Reference

```bash
nuxco dev                            # Start dev server with HMR
nuxco build                          # Production build
nuxco preview                        # Preview production build
nuxco bootstrap --name n --template t  # Scaffold new project
nuxco init                           # Generate nuxco.config.js
nuxco inspect                        # Inspect module graph
nuxco analyze                        # Analyze bundle size
nuxco doctor                         # Diagnose common issues
```

---

## Next Steps

- 📖 [Configuration Reference](./guides/configuration.md) — all config options with types and defaults
- 🔌 [Plugin Guide](./plugins.md) — extend Nuxco with plugins
- 📦 [Module Federation](./guides/federation.md) — micro-frontend architecture
- 🔥 [HMR Guide](./HMR_IMPLEMENTATION_STATUS.md) — how HMR works and how to debug it
- 🚚 [Migration Guide](./migration.md) — moving from Vite or Webpack
- ❓ [Troubleshooting](./TROUBLESHOOTING.md) — common errors and fixes
