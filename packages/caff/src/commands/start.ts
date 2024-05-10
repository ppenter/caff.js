import { Command } from "commander";
import { createServer } from "../core/server/server";
import { createBuild } from "../core/server/build";

export default async function build(program: Command) {
    program
    .command("start")
    .description("Start the server")
    .action(async () => {
        await createBuild()
        console.clear()
        await createServer()
    });
}