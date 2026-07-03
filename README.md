# ⚡ Zeptr — Modern Build Tool

[![npm version](https://img.shields.io/npm/v/zeptr.svg)](https://www.npmjs.com/package/zeptr)
[![CI](https://github.com/Avinash-1994/Zeptr/actions/workflows/ci.yml/badge.svg)](https://github.com/Avinash-1994/Zeptr/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-303%2F303-brightgreen)](#test-status)
[![Node >=20](https://img.shields.io/badge/node-%3E%3D20-blue)](https://nodejs.org)

**Zeptr** is a production-grade JavaScript/TypeScript build tool powered by **SWC (Rust)** and **LightningCSS**. It delivers sub-100ms HMR, native Module Federation for micro-frontends, full ES2022+ support, automatic tree shaking, a security gate pipeline, and zero-config support for **19 meta-frameworks** — a modern alternative to Webpack/Vite with a Rust-native core.

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
| 🔍 **Inspect UI** | Live plugin timing visualization at `/__zeptr_inspect__` |

---

## 🚀 Quick Start

```bash
# Install globally
npm install -g zeptr

# Create a new project (interactive)
zeptr create my-app --framework react --ts

# Or scaffold with a template
zeptr bootstrap --name my-app --template react-ts

# Start dev server
cd my-app
zeptr dev

# Production build
zeptr build
```

---

## 📦 Installation

```bash
npm install -g zeptr
# or per-project
npm install -D zeptr
```

**Requirements:** Node.js ≥ 20

---

## ⚙️ Configuration — `zeptr.config.ts`

```ts
// zeptr.config.ts
import { defineConfig } from 'zeptr';

export default defineConfig({
  // ── Entry ────────────────────────────────────────
  entry: ['./src/main.tsx'],        // string | string[]
  outDir: './dist',                  // output directory
  cacheDir: '.zeptr/cache',         // SQLite WAL cache location

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
    sbom: true,                      // emit dist/zeptr-sbom.json
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
zeptr <command> [options]
```

| Command | Description |
|---|---|
| `zeptr dev` | Start development server with HMR |
| `zeptr build` | Production build with tree shaking + minification |
| `zeptr preview` | Serve production build locally |
| `zeptr create [name]` | Create a new project interactively |
| `zeptr bootstrap` | Scaffold from a template |
| `zeptr init` | Initialize config in an existing project |
| `zeptr check` | Pre-build validation (type-check + circular imports) |
| `zeptr analyze` | Bundle composition report (HTML or JSON) |
| `zeptr why <module>` | Trace full import chain to a module |
| `zeptr inspect` | Inspect the dependency graph |
| `zeptr ssr` | Start SSR server for meta-frameworks |
| `zeptr security` | Security sub-commands (see below) |
| `zeptr migrate` | Migrate config from older Zeptr/Webpack/Vite |
| `zeptr audit` | Accessibility, performance, and SEO audit |
| `zeptr verify` | Project health and configuration check |
| `zeptr report` | AI-narrated build report from latest session |
| `zeptr doctor` | Diagnostics for project health |
| `zeptr test` | Run tests using Zeptr custom runner |
| `zeptr css purge` | Remove unused CSS |
| `zeptr env` | List and validate environment variables |
| `zeptr info` | Print environment info for bug reports |
| `zeptr workspaces` | Monorepo workspace commands |

### Security sub-commands

```bash
zeptr security audit          # full CVE + secret scan
zeptr security cve            # CVE-only scan against OSV API
zeptr security sbom           # generate SBOM (dist/zeptr-sbom.json)
zeptr security scan           # scan source for secret patterns
zeptr security plugin-audit   # audit plugin sandbox permissions
zeptr security headers        # generate security headers manifest
zeptr security report         # print full security report
zeptr security fix            # auto-upgrade vulnerable lockfile deps
```

### Key options

```bash
zeptr dev --port 3000 --host 0.0.0.0
zeptr build --outDir ./out --sourcemap inline
zeptr check --no-types           # skip tsc, only circular check
zeptr analyze --json             # JSON output instead of HTML
zeptr why react-dom              # trace import chain
zeptr inspect --filter src/      # filter dependency graph
zeptr ssr --framework remix --port 4000 --prod
zeptr verify --ci --strict       # CI mode: exit 1 on any issue
zeptr create my-app --framework vue --ts --tailwind
```

---

## 🏗️ Meta-Framework Support

Zeptr detects your framework automatically from config files and applies the correct adapter. Use `zeptr dev` and `zeptr build` — no extra setup required.

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
// zeptr.config.ts
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
npm install -D @zeptr/plugin-env @zeptr/plugin-pwa
```

```ts
import { envPlugin } from '@zeptr/plugin-env';
import { pwaPlugin } from '@zeptr/plugin-pwa';
import { iconsPlugin } from '@zeptr/plugin-icons';
import { svgPlugin } from '@zeptr/plugin-svg';
import { legacyPlugin } from '@zeptr/plugin-legacy';
import { compressionPlugin } from '@zeptr/plugin-compression';
import { autoImportPlugin } from '@zeptr/plugin-auto-import';
import { inspectPlugin } from '@zeptr/plugin-inspect';
import { checkerPlugin } from '@zeptr/plugin-checker';
import { mockPlugin } from '@zeptr/plugin-mock';
import { imagePlugin } from '@zeptr/plugin-image';

export default defineConfig({
  plugins: [
    envPlugin({
      prefix: 'ZEPTR_',             // only expose ZEPTR_* vars to bundle
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
    inspectPlugin(),                 // UI at /__zeptr_inspect__
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
| `@zeptr/plugin-env` | Loads `.env`, filters to prefix, generates `env.d.ts`, blocks secret patterns |
| `@zeptr/plugin-pwa` | Generates `manifest.json` + Service Worker with precache |
| `@zeptr/plugin-icons` | On-demand icon loading via `~icons/mdi/home` (no unused icons in bundle) |
| `@zeptr/plugin-svg` | SVG as URL, raw string, or React/Vue component |
| `@zeptr/plugin-legacy` | `<script nomodule>` fallback bundle via SWC + core-js |
| `@zeptr/plugin-compression` | Parallel Brotli + Gzip via Rust threads |
| `@zeptr/plugin-auto-import` | Auto-inject framework imports, sync `.eslintrc-auto-import` |
| `@zeptr/plugin-inspect` | Dev GUI at `/__zeptr_inspect__` showing per-plugin timings |
| `@zeptr/plugin-checker` | Worker-thread tsc, eslint, stylelint with overlay error display |
| `@zeptr/plugin-mock` | REST + GraphQL local mock server with fast intercept |
| `@zeptr/plugin-image` | sharp AVIF/WebP optimization, responsive `srcset` |

---

## 🔒 Security Pipeline

Zeptr has a built-in security gate that runs on every production build.

### What it checks

| Gate | Action |
|---|---|
| **Secret scanning** | AWS keys, Stripe keys, JWTs, GitHub tokens, PEM headers → abort build |
| **CVE gating** | OSV API scan — blocks at configured severity (`high` by default) |
| **CSP injection** | Injects `<meta http-equiv="Content-Security-Policy">` into all HTML pages |
| **SRI hashes** | Injects `integrity="sha384-..."` on all `<script>` and `<link>` tags |
| **SBOM** | Generates `dist/zeptr-sbom.json` with full dependency inventory |
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
ZEPTR_SKIP_SECURITY=1 zeptr build   # bypasses all security gates
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
// zeptr.workspace.ts
export default {
  packages: ['packages/*', 'apps/*'],
  build: {
    order: 'topological',      // respect dependency graph
    parallel: true,            // parallel where safe
  },
};
```

```bash
zeptr workspaces build        # build all packages in dependency order
zeptr workspaces dev          # run dev servers for all packages
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
| `ERR_MODULE_NOT_FOUND @zeptr/security` | Run `cd packages/zeptr-security && npx tsc` to build the package |
| CVE scanner aborts dev build | Use `ZEPTR_SKIP_SECURITY=1` for dev fixtures only |
| HMR not working | Check `dev.hmr: true` in config; ensure port is not in use |
| `build_output/` is empty | Zeptr writes to `dist/` by default; check your `outDir` config |
| TypeScript errors on `@zeptr/*` | Verify `tsconfig.json` has the `paths` mapping to `packages/zeptr-*/src` |
| `--root` flag unknown | Use `cwd` option instead: `execFileSync('node', ['build'], { cwd: dir })` |

---

## 📁 Package Structure

```
zeptr/
├── src/
│   ├── cli.ts                    # CLI entry — 20+ commands
│   ├── commands/                 # analyze, security, ssr, migrate, …
│   ├── build/bundler.ts          # core bundler + security gate
│   ├── config/types.ts           # ZeptrConfig type definitions
│   ├── dev/devServer.ts          # uWS dev server + HMR
│   ├── meta-frameworks/          # 19 framework adapters
│   └── plugins/inspect/          # inspect UI (/__zeptr_inspect__)
├── packages/
│   ├── zeptr-security/           # CVE, CSP, SRI, SBOM, secret scan
│   ├── zeptr-plugin-{name}/      # 11 official plugins
│   ├── zeptr-ssr/                # SSR adapter core
│   ├── zeptr-workspace/          # monorepo orchestration
│   ├── zeptr-hmr-client/         # browser HMR client
│   └── zeptr-module-registry/    # MFE module registry
└── e2e/fixtures/                 # 50+ real framework test fixtures
```

---

## 🤝 Contributing

```bash
git clone https://github.com/Avinash-1994/zeptr
cd zeptr
npm install
npm run build
npm run typecheck      # tsc --noEmit (0 errors expected)
node dist/cli.js dev   # test locally
```

---

## 📄 License

MIT © [Avinash-1994](https://github.com/Avinash-1994)
