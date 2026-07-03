#!/usr/bin/env node
import { createNuxcProject } from './create/index.js';

const projectName = process.argv[2];
createNuxcProject(projectName).catch((err) => {
    console.error(err);
    process.exit(1);
});
