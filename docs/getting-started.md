# Getting Started with Nuce

> Get from zero to a running app in **under 5 minutes**.

---

## Prerequisites

- **Node.js** ≥ 20 ([download](https://nodejs.org))
- **npm** ≥ 8 (bundled with Node.js)

---

## Step 1 — Install Nuce

```bash
npm install -g nuce
```

Verify the installation:

```bash
nuce --version
# ⚡ nuce v1.0.9
```

---

## Step 2 — Scaffold a New Project

Pick your framework:

```bash
# React + TypeScript (recommended)
nuce bootstrap --name my-app --template react-ts

# Vue 3 + TypeScript
nuce bootstrap --name my-app --template vue-ts

# Svelte + TypeScript
nuce bootstrap --name my-app --template svelte-ts

# Vanilla TypeScript
nuce bootstrap --name my-app --template vanilla-ts
```

This creates a `my-app/` directory with a working starter project.

---

## Step 3 — Start the Dev Server

```bash
cd my-app
nuce dev
```

You should see:

```
⚡ Nuce v1.0.9
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/

  ✔ Ready in 312ms
```

Open [http://localhost:3000](http://localhost:3000) in your browser. **HMR is active** — edit any file and changes appear instantly without a full reload.

---

## Step 4 — Production Build

```bash
nuce build
```

Output goes to `./dist/`. The build is minified, tree-shaken, and ready to deploy.

---

## Step 5 — Preview the Production Build

```bash
nuce preview
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
├── nuce.config.js    ← Nuce configuration
└── package.json
```

---

## Minimal Configuration

The scaffolded `nuce.config.js` works out of the box:

```js
// nuce.config.js
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

If you already have a project, you can add Nuce without scaffolding:

```bash
# Install locally
npm install --save-dev nuce

# Generate a config file
npx nuce init
```

Then update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "nuce dev",
    "build": "nuce build",
    "preview": "nuce preview"
  }
}
```

---

## CLI Reference

```bash
nuce dev                            # Start dev server with HMR
nuce build                          # Production build
nuce preview                        # Preview production build
nuce bootstrap --name n --template t  # Scaffold new project
nuce init                           # Generate nuce.config.js
nuce inspect                        # Inspect module graph
nuce analyze                        # Analyze bundle size
nuce doctor                         # Diagnose common issues
```

---

## Next Steps

- 📖 [Configuration Reference](./guides/configuration.md) — all config options with types and defaults
- 🔌 [Plugin Guide](./plugins.md) — extend Nuce with plugins
- 📦 [Module Federation](./guides/federation.md) — micro-frontend architecture
- 🔥 [HMR Guide](./HMR_IMPLEMENTATION_STATUS.md) — how HMR works and how to debug it
- 🚚 [Migration Guide](./migration.md) — moving from Vite or Webpack
- ❓ [Troubleshooting](./TROUBLESHOOTING.md) — common errors and fixes
