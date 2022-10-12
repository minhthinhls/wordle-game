import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';

const reactSvgPlugin = require('vite-plugin-react-svg');

/** - Watch how to Config Vite here: {@link https://vitejs.dev/config/} */
export default defineConfig({
  plugins: [
    reactRefresh(),
    reactSvgPlugin({
      defaultExport: 'component',
    }),
  ],

  resolve: {
    alias: [
      {find: '$', replacement: path.resolve(__dirname, '.')},
      {find: '@', replacement: path.resolve(__dirname, 'src')},
    ],
  },

  server: {
    port: Number(process.env.PORT) || 80,
  },

  build: {
    outDir: 'build',
  },
});
