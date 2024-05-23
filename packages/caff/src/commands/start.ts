import { Command } from "commander";
import chokidar from "chokidar";
import _package from "../../package.json";
import WebSocket from "ws";
import { logger, spinner } from "caff-logger";
import { createBuild } from "../core/server/build";
import glob from "../utils/global";
import { createServer } from "../core/server/server";

let server = null as any;
const serverSockets = new Set<any>();
let wss = null as WebSocket.Server | null;
let clients = [] as any[];

let isRestarting = false;

let _spinner = spinner("Restarting");

export default async function build(program: Command) {
    program
    .command("start")
    .description("Start the server")
    .action(async () => {
        process.env.NODE_ENV = "production";
      process.env.PORT = process.env.PORT || "3000";
      glob.clients = [] as WebSocket[];
      console.clear();

      await startServer();
      console.log(`
        Caff.js version: ${_package.version}
        Server is running on http://localhost:${process.env.PORT}
      `);
    });
}

async function startServer() {
    const sv1 = await createBuild()
    destroySockets(serverSockets);
    if(!server?.address()){
    wss?.close();
    const {server: _server, wss: websocket} = await sv1.startServer();
    server = _server;
    wss = websocket;
    wss?.on("connection", (socket: any) => {
        serverSockets.add(socket);
        socket.on("close", () => {
          serverSockets.delete(socket);
        });
      });
    }
  }

  function destroySockets(sockets: any) {
    for (const socket of sockets.values()) {
        socket.destroy();
    }
    if(server) {
      server?.close();
    }
  }