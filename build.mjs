import * as esbuild from 'esbuild';
import sassPlugin from 'esbuild-plugin-sass';

const ctx = await esbuild.context({
  entryPoints: ['./assets/index.tsx'],
  bundle: true,
  outdir: 'dist',
  jsx: 'transform',
  sourcemap: true,
  loader: { '.svg': 'dataurl' },
  plugins: [sassPlugin()],
});

await ctx.watch();

const { host, port } = await ctx.serve({
  port: 3000,
  servedir: 'dist',
});
