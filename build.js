const esbuild = require("esbuild");
const sassPlugin = require("esbuild-plugin-sass");

esbuild.build({
    entryPoints: ['./assets/index.tsx'],
    bundle: true,
    outdir: 'dist',
    jsx: 'transform',
    sourcemap: true,
    loader: { '.svg': 'dataurl' },
    plugins: [sassPlugin()]
});