#!/usr/bin/env node
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const req = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We just forward to the zeptr package's create-zeptr script
try {
  import('zeptr/dist/create-zeptr.js');
} catch (e) {
  console.error("Failed to load zeptr's create tool. Is zeptr installed?");
  process.exit(1);
}
