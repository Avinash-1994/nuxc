#!/usr/bin/env node
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const req = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We just forward to the nuxco package's create-nuxco script
try {
  import('nuxco/dist/create-nuxco.js');
} catch (e) {
  console.error("Failed to load nuxco's create tool. Is nuxco installed?");
  process.exit(1);
}
