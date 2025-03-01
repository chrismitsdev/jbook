import path from 'path'
import {Command} from 'commander'
import {serve} from '@chrismitsdev/local-api'
import chalk from 'chalk'

interface LocalApiError {
  code: string
}

const isProduction = process.env.NODE_ENV === 'production'

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async function (filename = 'notebook.js', options: {port: string}) {
    function isLocalApiError(err: any): err is LocalApiError {
      return typeof err.code === 'string'
    }

    try {
      const dir = path.join(process.cwd(), path.dirname(filename))
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      )
      console.log(
        chalk.greenBright(
          `🚀 Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
        )
      )
    } catch (error) {
      if (isLocalApiError(error)) {
        if (error.code === 'EADDRINUSE') {
          console.error(
            chalk.redBright(
              '❗ Port is in use. Try running on a different port.'
            )
          )
        }
      } else if (error instanceof Error) {
        console.log(
          chalk.redBright('❌ Unknown error occurred.', error.message)
        )
      }

      process.exit(1)
    }
  })
