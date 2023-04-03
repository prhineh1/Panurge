import * as esbuild from 'esbuild';
import sassPlugin from 'esbuild-plugin-sass';

const port = +process.env.ESBUILD_PORT;

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

await ctx.serve({
  port,
  servedir: 'dist',
});
