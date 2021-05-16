import html from '@web/rollup-plugin-html';
import nodeResolve from '@rollup/plugin-node-resolve';

// import merge from 'deepmerge';
// import { createSpaConfig } from '@open-wc/building-rollup';

// const baseConfig = createSpaConfig({
//   developmentMode: process.env.ROLLUP_WATCH === 'true',
//   injectServiceWorker: false,
// });

export default {
  output: { dir: 'dist' },
  input: './src/index.html',
  plugins: [html(), nodeResolve()],
};
