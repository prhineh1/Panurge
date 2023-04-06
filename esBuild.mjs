import * as esbuild from 'esbuild';
import sassPlugin from 'esbuild-plugin-sass';

esbuild.build({
  entryPoints: ['./assets/index.tsx'],
  bundle: true,
  minify: true,
  outdir: 'dist',
  jsx: 'transform',
  loader: { '.svg': 'dataurl' },
  plugins: [sassPlugin()],
});
