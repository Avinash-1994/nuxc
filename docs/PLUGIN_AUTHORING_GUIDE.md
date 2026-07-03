/**
 * Plugin Authoring Guide for Nuxco v1
 * 
 * follow strict strict rules to ensure stability and compatibility.
 */

/*
# Nuxco Plugin API Reference

Nuxco plugins are compatible with Rollup plugins, with additional governance for stability.

## Required Properties

- `name` (string): Unique ID (e.g. `nuxco-plugin-my-feature`)
- `stability` (string): 'experimental' | 'stable' | 'deprecated'

## Hooks

All standard Rollup hooks are supported:
- `buildStart()`
- `resolveId(source, importer)`
- `load(id)`
- `transform(code, id)`
- `buildEnd()`

## Example

```typescript
import { Plugin } from 'nuxco';

export function myPlugin(): Plugin {
  return {
    name: 'nuxco-plugin-example',
    stability: 'stable',
    async transform(code, id) {
      if (id.endsWith('.foo')) {
        return code.replace('foo', 'bar');
      }
    }
  };
}
```
*/
