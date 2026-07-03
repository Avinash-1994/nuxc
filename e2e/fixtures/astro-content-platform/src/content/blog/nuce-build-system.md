---
title: "Zeptr Build System Deep Dive"
description: "How Zeptr handles multi-framework compilation with sub-second HMR."
date: "2025-01-20"
author: "Avinash"
tags: ["zeptr", "build", "performance"]
featured: false
---

# Zeptr Build System Deep Dive

Zeptr is a next-generation build system supporting Angular, Nuxt, SvelteKit, SolidStart, Qwik City, and Astro.

## Core Features

- SQLite-backed module cache
- Rust-native file watcher
- uWS (μWebSockets) for dev server
- SWC for TypeScript/JSX downleveling

## Performance Benchmarks

Cold start: 35ms average across all frameworks.
HMR latency: 60ms on bare metal.
Build time: 500ms for a 10-route app.
