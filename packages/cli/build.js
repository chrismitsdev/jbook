import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/index.js',
  minify: true,
  define: {
    ['process.env.NODE_ENV']: '"production"'
  },
  external: ['@chrismitsdev/local-client']
})
