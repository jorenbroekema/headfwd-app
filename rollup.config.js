import html from '@web/rollup-plugin-html';
import nodeResolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  output: { dir: 'dist' },
  input: './src/index.html',
  plugins: [
    nodeResolve(),
    html(),
    copy({
      targets: [{ src: 'src/assets/images', dest: 'dist/assets' }],
    }),
  ],
};
