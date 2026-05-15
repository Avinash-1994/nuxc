import { defineConfig } from 'sparx';
export default defineConfig({
  framework: 'react',
  mfe: {
    name: 'host',
    remotes: {
      vueRemote: 'http://localhost:5174/remoteEntry.js',
      reactRemote: 'http://localhost:5175/remoteEntry.js',
    },
    shared: { react: { singleton: true, requiredVersion: '18.3.1' }, 'react-dom': { singleton: true } }
  }
});
