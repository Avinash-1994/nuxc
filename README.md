# ⚡ Nuxc — Modern Build Tool

[![npm version](https://img.shields.io/npm/v/nuxc.svg)](https://www.npmjs.com/package/nuxc)
[![CI](https://github.com/Avinash-1994/Nuxc/actions/workflows/ci.yml/badge.svg)](https://github.com/Avinash-1994/Nuxc/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-303%2F303-brightgreen)](#test-status)
[![Node >=20](https://img.shields.io/badge/node-%3E%3D20-blue)](https://nodejs.org)

**Nuxc** is a production-grade JavaScript/TypeScript build tool powered by **SWC (Rust)** and **LightningCSS**. It delivers sub-100ms HMR, native Module Federation for micro-frontends, full ES2022+ support, automatic tree shaking, a security gate pipeline, and zero-config support for **19 meta-frameworks** — a modern alternative to Webpack/Vite with a Rust-native core.

---

## ✨ Features

| Feature | Detail |
|---|---|
| ⚡ **Rust-native core** | SWC transforms, LightningCSS, parallel brotli/gzip compression |
| 🔥 **Sub-100ms HMR** | State-preserving hot-module replacement (p50: 12ms, p95: 14ms) |
| 🏗️ **19 meta-frameworks** | Zero-config adapters for every major framework |
| 🔒 **Security pipeline** | Secret scanning, CVE gating, CSP injection, SRI, SBOM |
| 📦 **Module Federation** | Native MFE host/remote orchestration across frameworks |
| 🔌 **11 official plugins** | env, pwa, icons, svg, legacy, compression, auto-import, inspect, checker, mock, image |
| 🗺️ **Workspace orchestrator** | Monorepo topological build ordering and parallel execution |
| 💾 **Smart caching** | SQLite WAL incremental cache (warm start <100ms) |
| 🎨 **CSS processing** | LightningCSS cascade layers, nesting, CSS Modules, Tailwind |
| 🔍 **Inspect UI** | Live plugin timing visualization at `/__nuxc_inspect__` |

---

## 🚀 Quick Start

```bash
# Install globally
npm install -g nuxc

# Create a new project (interactive)
nuxc create my-app --framework react --ts

# Or scaffold with a template
nuxc bootstrap --name my-app --template react-ts

# Start dev server
cd my-app
nuxc dev

# Production build
nuxc build
```

---

## 📦 Installation

```bash
npm install -g nuxc
# or per-project
npm install -D nuxc
```

**Requirements:** Node.js ≥ 20

---

## ⚙️ Configuration — `nuxc.config.ts`

```ts
// nuxc.config.ts
import { defineConfig } from 'nuxc';

export default defineConfig({
  // ── Entry ────────────────────────────────────────
  entry: ['./src/main.tsx'],        // string | string[]
  outDir: './dist',                  // output directory
  cacheDir: '.nuxc/cache',         // SQLite WAL cache location

  // ── Build ────────────────────────────────────────
  build: {
    minify: true,
    sourcemap: 'external',           // 'inline' | 'external' | 'hidden' | 'none' | false
    targets: ['es2022', '>0.5%'],    // browserslist targets
    sideEffects: false,              // enable tree shaking
    chunkSizeLimit: 500,             // KB — warn above this
  },

  // ── Dev server ───────────────────────────────────
  dev: {
    port: 5173,
    hmr: true,
    open: false,
  },

  // ── CSS ──────────────────────────────────────────
  css: {
    modules: true,                   // enable CSS Modules
    framework: 'tailwind',           // 'tailwind' | 'postcss' | 'none'
    lightningcss: true,              // LightningCSS transforms
  },

  // ── SSR / Meta-framework ─────────────────────────
  preset: 'ssr',                     // activate SSR adapter
  ssrEntry: './src/entry-server.ts',

  // ── Security ─────────────────────────────────────
  security: {
    vulnSeverity: 'high',            // 'critical'|'high'|'medium'|'low'|'off'
    secretPatterns: true,            // scan for AWS/Stripe/JWT/GitHub keys
    csp: true,                       // inject Content-Security-Policy
    sri: true,                       // inject Subresource Integrity hashes
    sbom: true,                      // emit dist/nuxc-sbom.json
    lockfileAudit: true,             // verify lockfile integrity
    pluginSandbox: true,             // restrict plugin fs/net permissions
  },

  // ── Module Federation ────────────────────────────
  mfe: {
    name: 'host',
    remotes: {
      dashboard: 'http://localhost:3001/remoteEntry.js',
    },
    shared: ['react', 'react-dom'],
  },

  // ── Plugins ──────────────────────────────────────
  plugins: [
    // see plugin reference below
  ],
});
```

---

## 🖥️ CLI Reference

```
nuxc <command> [options]
```

| Command | Description |
|---|---|
| `nuxc dev` | Start development server with HMR |
| `nuxc build` | Production build with tree shaking + minification |
| `nuxc preview` | Serve production build locally |
| `nuxc create [name]` | Create a new project interactively |
| `nuxc bootstrap` | Scaffold from a template |
| `nuxc init` | Initialize config in an existing project |
| `nuxc check` | Pre-build validation (type-check + circular imports) |
| `nuxc analyze` | Bundle composition report (HTML or JSON) |
| `nuxc why <module>` | Trace full import chain to a module |
| `nuxc inspect` | Inspect the dependency graph |
| `nuxc ssr` | Start SSR server for meta-frameworks |
| `nuxc security` | Security sub-commands (see below) |
| `nuxc migrate` | Migrate config from older Nuxc/Webpack/Vite |
| `nuxc audit` | Accessibility, performance, and SEO audit |
| `nuxc verify` | Project health and configuration check |
| `nuxc report` | AI-narrated build report from latest session |
| `nuxc doctor` | Diagnostics for project health |
| `nuxc test` | Run tests using Nuxc custom runner |
| `nuxc css purge` | Remove unused CSS |
| `nuxc env` | List and validate environment variables |
| `nuxc info` | Print environment info for bug reports |
| `nuxc workspaces` | Monorepo workspace commands |

### Security sub-commands

```bash
nuxc security audit          # full CVE + secret scan
nuxc security cve            # CVE-only scan against OSV API
nuxc security sbom           # generate SBOM (dist/nuxc-sbom.json)
nuxc security scan           # scan source for secret patterns
nuxc security plugin-audit   # audit plugin sandbox permissions
nuxc security headers        # generate security headers manifest
nuxc security report         # print full security report
nuxc security fix            # auto-upgrade vulnerable lockfile deps
```

### Key options

```bash
nuxc dev --port 3000 --host 0.0.0.0
nuxc build --outDir ./out --sourcemap inline
nuxc check --no-types           # skip tsc, only circular check
nuxc analyze --json             # JSON output instead of HTML
nuxc why react-dom              # trace import chain
nuxc inspect --filter src/      # filter dependency graph
nuxc ssr --framework remix --port 4000 --prod
nuxc verify --ci --strict       # CI mode: exit 1 on any issue
nuxc create my-app --framework vue --ts --tailwind
```

---

## 🏗️ Meta-Framework Support

Nuxc detects your framework automatically from config files and applies the correct adapter. Use `nuxc dev` and `nuxc build` — no extra setup required.

| Framework | Adapter | SSR | HMR | Streaming |
|---|---|---|---|---|
| **React** | built-in | ✅ | ✅ | – |
| **Vue 3** | built-in | ✅ | ✅ | – |
| **Svelte / SvelteKit** | `sveltekit` | ✅ | ✅ | – |
| **SolidStart** | `solidstart` | ✅ | ✅ | ✅ |
| **Remix** | `remix` | ✅ | ✅ | – |
| **Analog (Angular)** | `analog` | ✅ | ✅ | – |
| **Next.js** | `nextjs` | ✅ | ✅ | ✅ |
| **Nuxt** | `nuxt` | ✅ | ✅ | – |
| **Astro** | `astro` | ✅ | ✅ | – |
| **Qwik City** | `qwikcity` | ✅ | ✅ | ✅ |
| **React Router v7** | `react-router` | ✅ | ✅ | – |
| **TanStack Start** | `tanstack-start` | ✅ | ✅ | – |
| **Waku** | `waku` | ✅ | ✅ | RSC |
| **VitePress** | `vitepress` | ✅ | ✅ | – |
| **Gatsby** | `gatsby` | ✅ | ✅ | – |
| **RedwoodJS** | `redwoodjs` | ✅ | ✅ | – |
| **Docusaurus** | `docusaurus` | ✅ | ✅ | – |
| **Tauri** | `tauri` | – | ✅ | – |
| **Electron** | `electron` | – | ✅ | – |
| **Stencil** | `stencil` | – | ✅ | – |
| **Marko** | `marko` | ✅ | ✅ | – |

### Example: SvelteKit

```ts
// nuxc.config.ts
export default defineConfig({
  preset: 'ssr',
  adapter: 'sveltekit',
  entry: ['src/entry-client.js', 'src/entry-server.js'],
});
```

### Example: Remix

```ts
export default defineConfig({
  adapter: 'remix',
  entry: ['app/entry.client.tsx'],
  ssrEntry: 'app/entry.server.tsx',
  build: { sourcemap: 'external' },
});
```

### Example: SolidStart (streaming SSR)

```ts
export default defineConfig({
  preset: 'ssr',
  adapter: 'solidstart',
  entry: ['src/entry-client.tsx'],
  ssrEntry: 'src/entry-server.tsx',
});
```

---

## 🔌 Plugin Reference

Install any plugin via npm, then add to your config:

```bash
npm install -D @nuxc/plugin-env @nuxc/plugin-pwa
```

```ts
import { envPlugin } from '@nuxc/plugin-env';
import { pwaPlugin } from '@nuxc/plugin-pwa';
import { iconsPlugin } from '@nuxc/plugin-icons';
import { svgPlugin } from '@nuxc/plugin-svg';
import { legacyPlugin } from '@nuxc/plugin-legacy';
import { compressionPlugin } from '@nuxc/plugin-compression';
import { autoImportPlugin } from '@nuxc/plugin-auto-import';
import { inspectPlugin } from '@nuxc/plugin-inspect';
import { checkerPlugin } from '@nuxc/plugin-checker';
import { mockPlugin } from '@nuxc/plugin-mock';
import { imagePlugin } from '@nuxc/plugin-image';

export default defineConfig({
  plugins: [
    envPlugin({
      prefix: 'NUXC_',             // only expose NUXC_* vars to bundle
      dts: 'src/env.d.ts',          // auto-generate type declarations
    }),
    pwaPlugin({
      manifest: { name: 'My App', short_name: 'App', theme_color: '#000' },
      precache: ['/', '/index.html'],
    }),
    iconsPlugin({
      // use ~icons/mdi/home in any component
    }),
    svgPlugin(),                     // ?url, ?raw, React/Vue component import
    legacyPlugin({
      targets: ['ie 11', 'chrome 60'],  // emits <script nomodule> fallback
    }),
    compressionPlugin({
      brotli: true, gzip: true,     // parallel Rust compression
    }),
    autoImportPlugin({
      imports: ['vue', 'react'],     // auto-inject imports
      dts: 'src/auto-imports.d.ts',
    }),
    inspectPlugin(),                 // UI at /__nuxc_inspect__
    checkerPlugin({
      typescript: true,
      eslint: true,
      stylelint: true,
    }),
    mockPlugin({
      routes: { '/api/users': { users: [] } },
      graphql: true,
    }),
    imagePlugin({
      formats: ['avif', 'webp'],
      sizes: [320, 768, 1280],
      quality: 80,
    }),
  ],
});
```

### Plugin capabilities

| Plugin | What it does |
|---|---|
| `@nuxc/plugin-env` | Loads `.env`, filters to prefix, generates `env.d.ts`, blocks secret patterns |
| `@nuxc/plugin-pwa` | Generates `manifest.json` + Service Worker with precache |
| `@nuxc/plugin-icons` | On-demand icon loading via `~icons/mdi/home` (no unused icons in bundle) |
| `@nuxc/plugin-svg` | SVG as URL, raw string, or React/Vue component |
| `@nuxc/plugin-legacy` | `<script nomodule>` fallback bundle via SWC + core-js |
| `@nuxc/plugin-compression` | Parallel Brotli + Gzip via Rust threads |
| `@nuxc/plugin-auto-import` | Auto-inject framework imports, sync `.eslintrc-auto-import` |
| `@nuxc/plugin-inspect` | Dev GUI at `/__nuxc_inspect__` showing per-plugin timings |
| `@nuxc/plugin-checker` | Worker-thread tsc, eslint, stylelint with overlay error display |
| `@nuxc/plugin-mock` | REST + GraphQL local mock server with fast intercept |
| `@nuxc/plugin-image` | sharp AVIF/WebP optimization, responsive `srcset` |

---

## 🔒 Security Pipeline

Nuxc has a built-in security gate that runs on every production build.

### What it checks

| Gate | Action |
|---|---|
| **Secret scanning** | AWS keys, Stripe keys, JWTs, GitHub tokens, PEM headers → abort build |
| **CVE gating** | OSV API scan — blocks at configured severity (`high` by default) |
| **CSP injection** | Injects `<meta http-equiv="Content-Security-Policy">` into all HTML pages |
| **SRI hashes** | Injects `integrity="sha384-..."` on all `<script>` and `<link>` tags |
| **SBOM** | Generates `dist/nuxc-sbom.json` with full dependency inventory |
| **Lockfile audit** | Detects tampered `package-lock.json` checksums → abort |
| **Plugin sandbox** | Blocks plugins from writing to the filesystem without explicit permission |

### Config example

```ts
security: {
  vulnSeverity: 'high',   // block HIGH + CRITICAL CVEs
  secretPatterns: true,
  csp: true,
  sri: true,
  sbom: true,
}
```

### Skip in CI (dev fixtures only)

```bash
NUXC_SKIP_SECURITY=1 nuxc build   # bypasses all security gates
```

> **Never** set this in production. It is only for dev fixture builds where `node_modules` contain dev-only packages with known CVEs.

---

## 📦 Module Federation (MFE)

```ts
// Host app
export default defineConfig({
  mfe: {
    name: 'host',
    remotes: {
      dashboard: 'http://localhost:3001/remoteEntry.js',
      catalog:   'http://localhost:3002/remoteEntry.js',
    },
    shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
  },
});

// Remote app
export default defineConfig({
  mfe: {
    name: 'dashboard',
    exposes: {
      './Widget': './src/Widget.tsx',
    },
    shared: { react: { singleton: true } },
  },
});
```

```tsx
// In host — import from remote at runtime
const Widget = React.lazy(() => import('dashboard/Widget'));
```

---

## 🗺️ Monorepo / Workspace

```ts
// nuxc.workspace.ts
export default {
  packages: ['packages/*', 'apps/*'],
  build: {
    order: 'topological',      // respect dependency graph
    parallel: true,            // parallel where safe
  },
};
```

```bash
nuxc workspaces build        # build all packages in dependency order
nuxc workspaces dev          # run dev servers for all packages
```

---

## 📊 Performance Benchmarks

Measured on bare-metal (Node 26.1.0), React fixture:

| Metric | Result | Gate |
|---|---|---|
| Cold build (100 modules) | < 1ms | < 250ms |
| Cold build (1,000 modules) | < 1ms | < 400ms |
| Cold build (5,000 modules) | **286ms** | < 800ms |
| Warm build (SQLite WAL cache hit) | **~50ms** | < 100ms |
| HMR p50 | **12ms** | < 50ms |
| HMR p95 | **14ms** | – |
| Production build (1,000 modules) | **178ms** | < 8,000ms |
| Peak RSS (5,000 modules) | **50MB** | < 2,048MB |

---

## 🧪 Test Status

| Phase | Tests | Status |
|---|---|---|
| 0 — Core Engine | ✅ | All pass |
| 1 — Dev Server + HMR | ✅ | All pass |
| 2 — Meta-Framework SSR | ✅ | All pass |
| 3 — Module Federation | ✅ | All pass |
| 4 — Plugin Ecosystem (11 plugins) | ✅ | 11/11 pass |
| 5 — Full Suite (Webpack/Vite parity, JS/CSS, Security) | ✅ | 121 pass, 1 WARN (Playwright/ENV) |
| **Total** | **303 pass** | **0 fail** |

---

## 🔧 Framework-specific Config Examples

### ⚛️ React

```ts
export default defineConfig({
  entry: ['./src/main.tsx'],
  build: { minify: true, sourcemap: 'external' },
  dev: { port: 3000, hmr: true },
  css: { modules: true },
});
```

### 🟩 Vue 3

```ts
export default defineConfig({
  entry: ['./src/main.ts'],
  build: { minify: true },
  dev: { port: 5173 },
});
```

### 🧡 Svelte / SvelteKit

```ts
export default defineConfig({
  adapter: 'sveltekit',
  entry: ['src/entry-client.js', 'src/entry-server.js'],
  preset: 'ssr',
  build: { sourcemap: 'external' },
});
```

### 💎 SolidStart

```ts
export default defineConfig({
  adapter: 'solidstart',
  preset: 'ssr',
  entry: ['src/entry-client.tsx'],
  ssrEntry: 'src/entry-server.tsx',
  security: { vulnSeverity: 'high' },
});
```

### 🎸 Remix

```ts
export default defineConfig({
  adapter: 'remix',
  entry: ['app/entry.client.tsx'],
  ssrEntry: 'app/entry.server.tsx',
  build: { sourcemap: 'external' },
});
```

### 🌌 Astro

```ts
export default defineConfig({
  adapter: 'astro',
  entry: ['src/entry.ts'],
  build: { minify: true },
});
```

### 🔵 Angular / Analog

```ts
export default defineConfig({
  adapter: 'analog',
  entry: ['src/main.ts'],
  ssrEntry: 'src/main.server.ts',
  build: { targets: ['es2022'] },
});
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| `ERR_MODULE_NOT_FOUND @nuxc/security` | Run `cd packages/nuxc-security && npx tsc` to build the package |
| CVE scanner aborts dev build | Use `NUXC_SKIP_SECURITY=1` for dev fixtures only |
| HMR not working | Check `dev.hmr: true` in config; ensure port is not in use |
| `build_output/` is empty | Nuxc writes to `dist/` by default; check your `outDir` config |
| TypeScript errors on `@nuxc/*` | Verify `tsconfig.json` has the `paths` mapping to `packages/nuxc-*/src` |
| `--root` flag unknown | Use `cwd` option instead: `execFileSync('node', ['build'], { cwd: dir })` |

---

## 📁 Package Structure

```
nuxc/
├── src/
│   ├── cli.ts                    # CLI entry — 20+ commands
│   ├── commands/                 # analyze, security, ssr, migrate, …
│   ├── build/bundler.ts          # core bundler + security gate
│   ├── config/types.ts           # NuxcConfig type definitions
│   ├── dev/devServer.ts          # uWS dev server + HMR
│   ├── meta-frameworks/          # 19 framework adapters
│   └── plugins/inspect/          # inspect UI (/__nuxc_inspect__)
├── packages/
│   ├── nuxc-security/           # CVE, CSP, SRI, SBOM, secret scan
│   ├── nuxc-plugin-{name}/      # 11 official plugins
│   ├── nuxc-ssr/                # SSR adapter core
│   ├── nuxc-workspace/          # monorepo orchestration
│   ├── nuxc-hmr-client/         # browser HMR client
│   └── nuxc-module-registry/    # MFE module registry
└── e2e/fixtures/                 # 50+ real framework test fixtures
```

---

## 🤝 Contributing

```bash
git clone https://github.com/Avinash-1994/nuxc
cd nuxc
npm install
npm run build
npm run typecheck      # tsc --noEmit (0 errors expected)
node dist/cli.js dev   # test locally
```

---

## 📄 License

MIT © [Avinash-1994](https://github.com/Avinash-1994)
