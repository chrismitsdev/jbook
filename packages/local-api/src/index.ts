import express from 'express'
import path from 'path'
import {createProxyMiddleware} from 'http-proxy-middleware'
import {createCellsRouter} from './routes/cells'

export function serve(
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) {
  const app = express()

  app.use(createCellsRouter(filename, dir))

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        // Target will be the vite dev server
        target: 'http://localhost:5173',
        ws: true,
        logger: console
      })
    )
  } else {
    const packagePath = require.resolve(
      '@chrismitsdev/local-client/dist/index.html'
    )
    app.use(express.static(path.dirname(packagePath)))
  }

  return new Promise<void>(function (resolve, reject) {
    app.listen(port, () => resolve()).on('error', reject)
  })
}
