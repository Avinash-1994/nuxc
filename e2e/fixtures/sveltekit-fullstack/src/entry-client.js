/**
 * SvelteKit client entry — browser hydration
 * Sparx Phase 2.4 / SVK-07
 *
 * In a real SvelteKit project this would call svelte's `mount()` / `hydrate()`.
 * This stub registers the app shell so the browser picks up SSR HTML.
 */

// Hydrate SSR root if present
const root = document.getElementById('sparx-ssr-root');
if (root) {
  // Signal hydration complete
  root.setAttribute('data-hydrated', 'true');
}

// Route client-side navigation
window.__sparx_svk_client__ = { version: '1.0', hydrated: !!root };
