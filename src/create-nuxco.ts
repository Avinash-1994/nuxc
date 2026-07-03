#!/usr/bin/env node
import { createNuxcoProject } from './create/index.js';

const projectName = process.argv[2];
createNuxcoProject(projectName).catch((err) => {
    console.error(err);
    process.exit(1);
});
