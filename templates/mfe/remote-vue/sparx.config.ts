import { defineConfig } from 'sparx';
export default defineConfig({
  framework: 'vue',
  dev: { port: 5174 },
  mfe: {
    name: 'vueRemote',
    exposes: { './Widget': './src/Widget.vue' },
    shared: { vue: { singleton: true } }
  }
});
