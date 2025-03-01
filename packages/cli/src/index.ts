#!/usr/bin/env node
import {program} from 'commander'
import {serveCommand} from './commands/serve'

// If we had additional commands to add after 'serve' command,
// we would need to chain them on
// e.g .addCommand(serveCommand).addCommand(otherCommand) etc
program.addCommand(serveCommand)

program.parse(process.argv)
