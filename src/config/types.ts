/**
 * Zeptr — Discriminated Union Config Types (PART 4)
 * Provides framework-specific IntelliSense via defineConfig overloads.
 */

// ─── Base (shared by all) ──────────────────────────────────────────────────

export interface ZeptrBaseConfig {
  entry?:     string | string[];
  outDir?:    string;
  mode?:      'development' | 'production' | 'test';
  port?:      number;
  root?:      string;
  base?:      string;
  publicDir?: string;
  cacheDir?:  string;
  plugins?:   any[];
  css?: {
    framework?: 'tailwind' | 'bootstrap' | 'bulma' | 'material' | 'none';
    purge?:     boolean;
    critical?:  boolean;
  };
  build?: {
    minify?:       boolean;
    sourcemap?:    'inline' | 'external' | 'hidden' | 'none' | boolean;
    splitting?:    boolean;
    cssModules?:   boolean;
    targets?:      string[];
    manualChunks?: Record<string, string[]>;
  };
  server?: {
    host?:       string;
    port?:       number;
    strictPort?: boolean;
    cors?:       boolean;
    open?:       boolean | string;
    proxy?:      Record<string, string | any>;
    https?:      boolean | { key: string; cert: string };
    headers?:    Record<string, string>;
  };
  security?: {
    vulnSeverity?: 'critical' | 'high' | 'medium' | 'low' | 'off';
    scan?: { allowlist?: string[] };
  };
  federation?: {
    name:          string;
    filename?:     string;
    exposes?:      Record<string, string>;
    remotes?:      Record<string, string>;
    shared?:       Record<string, { singleton?: boolean; requiredVersion?: string }>;
    prefetch?:     string[];
    fallback?:     string;
    mock?:         boolean;
    healthCheck?:  string;
  };
}

// ─── SSR Meta-Frameworks ───────────────────────────────────────────────────

export interface ZeptrSSRConfig extends ZeptrBaseConfig {
  framework: 'nuxt' | 'sveltekit' | 'svelte-kit' | 'remix' | 'solidstart'
           | 'solid-start' | 'astro' | 'analog' | 'tanstack-start' | 'waku'
           | 'next' | 'nextjs';
  preset?:    'ssr';
  platform?:  'node' | 'edge';
  ssrEntry?:  string;
}

// ─── Electron — dual bundle ────────────────────────────────────────────────

export interface ZeptrElectronConfig extends ZeptrBaseConfig {
  framework:      'electron';
  preset?:        'spa';
  platform?:      'browser';
  mainEntry?:     string; // default: src/main/index.ts
  rendererEntry?: string; // default: src/renderer/index.ts
  preloadEntry?:  string; // default: src/preload/index.ts
  ipcTypes?:      { output: string };
}

// ─── Tauri — WebView frontend ──────────────────────────────────────────────

export interface ZeptrTauriConfig extends ZeptrBaseConfig {
  framework: 'tauri';
  preset?:   'spa';
  platform?: 'browser';
  tauriSrc?: string; // default: src-tauri/
  ipcTypes?: { output: string };
}

// ─── SPA frameworks ───────────────────────────────────────────────────────

export interface ZeptrSPAConfig extends ZeptrBaseConfig {
  framework?: 'react' | 'vue' | 'svelte' | 'angular' | 'solid'
            | 'preact' | 'lit' | 'qwik' | 'vanilla';
  preset?:    'spa';
  platform?:  'browser';
}

// ─── defineConfig overloads ────────────────────────────────────────────────
/* eslint-disable no-redeclare */
export function defineConfig(c: ZeptrElectronConfig): ZeptrElectronConfig;
export function defineConfig(c: ZeptrTauriConfig):    ZeptrTauriConfig;
export function defineConfig(c: ZeptrSSRConfig):      ZeptrSSRConfig;
export function defineConfig(c: ZeptrSPAConfig):      ZeptrSPAConfig;
export function defineConfig(c: ZeptrBaseConfig):     ZeptrBaseConfig;
export function defineConfig(c: any): any { return c; }
/* eslint-enable no-redeclare */
