#!/usr/bin/env node
import { createNuceProject } from './create/index.js';

const projectName = process.argv[2];
createNuceProject(projectName).catch((err) => {
    console.error(err);
    process.exit(1);
});
