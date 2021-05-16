import proxy from 'koa-proxies';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  open: true,
  watch: true,
  rootDir: 'src',
  appIndex: 'index.html',
  middleware: [
    proxy('/api', {
      target: 'http://localhost:3000',
    }),
  ],
});
