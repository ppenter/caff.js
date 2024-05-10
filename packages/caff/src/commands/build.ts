import { Command } from "commander";
import { createBuild } from "../core/server/build";

export default async function build(program: Command) {
    program
    .command("build")
    .description("Build the project")
    .action(async () => {
        await createBuild()
    });
}