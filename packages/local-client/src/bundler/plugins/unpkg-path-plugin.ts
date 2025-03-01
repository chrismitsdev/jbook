import * as esbuild from 'esbuild-wasm'

export function unpkgPathPlugin(): esbuild.Plugin {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({filter: /(^index\.js$)/}, function () {
        return {path: 'index.js', namespace: 'a'}
      })

      // Handle relative paths in a module
      build.onResolve(
        {filter: /^\.+\//},
        function (args: esbuild.OnResolveArgs) {
          return {
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
            namespace: 'a'
          }
        }
      )

      // Handle main file of a module
      build.onResolve(
        {filter: /.*/},
        async function (args: esbuild.OnResolveArgs) {
          return {
            path: `https://unpkg.com/${args.path}`,
            namespace: 'a'
          }
        }
      )
    }
  }
}
