#! /usr/bin/env node

import { Command } from "commander";
import * as commands from "./commands";

const program = new Command()

for (const [name, command] of Object.entries(commands)) {
    command(program)
}

program.parse(process.argv)