#!/usr/bin/env node
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const req = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We just forward to the nuxc package's create-nuxc script
try {
  import('nuxc/dist/create-nuxc.js');
} catch (e) {
  console.error("Failed to load nuxc's create tool. Is nuxc installed?");
  process.exit(1);
}
