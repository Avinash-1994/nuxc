#!/usr/bin/env node
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const req = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We just forward to the nuce package's create-nuce script
try {
  import('nuce/dist/create-nuce.js');
} catch (e) {
  console.error("Failed to load nuce's create tool. Is nuce installed?");
  process.exit(1);
}
