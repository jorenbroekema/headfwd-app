import { playwrightLauncher } from '@web/test-runner-playwright';
import proxy from 'koa-proxies';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'test/**/*.test.js',
  nodeResolve: true,
  browsers: [playwrightLauncher({ product: 'chromium' })],
  middleware: [
    proxy('/api', {
      target: 'http://localhost:3000',
    }),
  ],
});
