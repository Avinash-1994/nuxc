#!/usr/bin/env node
import { createZeptrProject } from './create/index.js';

const projectName = process.argv[2];
createZeptrProject(projectName).catch((err) => {
    console.error(err);
    process.exit(1);
});
