/**
 * Plugin Authoring Guide for Zeptr v1
 * 
 * follow strict strict rules to ensure stability and compatibility.
 */

/*
# Zeptr Plugin API Reference

Zeptr plugins are compatible with Rollup plugins, with additional governance for stability.

## Required Properties

- `name` (string): Unique ID (e.g. `zeptr-plugin-my-feature`)
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
import { Plugin } from 'zeptr';

export function myPlugin(): Plugin {
  return {
    name: 'zeptr-plugin-example',
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
