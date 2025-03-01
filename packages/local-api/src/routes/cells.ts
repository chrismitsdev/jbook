import express, {type Router} from 'express'
import fs from 'fs/promises'
import path from 'path'

interface LocalApiError {
  code: string
}

interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

export function createCellsRouter(filename: string, dir: string): Router {
  const router = express.Router()
  router.use(express.json())

  const fullPath = path.join(dir, filename)

  router.get('/cells', async function (request, response) {
    function isLocalApiError(err: any): err is LocalApiError {
      return typeof err.code === 'string'
    }

    try {
      // Read the file
      const result = await fs.readFile(fullPath, {encoding: 'utf-8'})

      response.send(JSON.parse(result))
    } catch (error) {
      if (isLocalApiError(error)) {
        // Create a file and add default cells
        if (error.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8')
          response.send([])
        }
      } else {
        throw error
      }
    }
  })

  router.post('/cells', async function (request, response) {
    // Take the list of cells from the request obj
    // Serialize them
    const {cells}: {cells: Cell[]} = request.body
    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    response.send({status: 'ok'})
  })

  return router
}
