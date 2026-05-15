import { defineConfig } from 'sparx';
export default defineConfig({
  framework: 'react',
  dev: { port: 5175 },
  mfe: {
    name: 'reactRemote',
    exposes: { './Dashboard': './src/Dashboard.tsx' },
    shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
  }
});
