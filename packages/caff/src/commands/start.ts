import { Command } from "commander";
import _package from "../../package.json";
import WebSocket from "ws";
import { createBuild } from "../core/server/build";
import glob from "../utils/global";

let server = null as any;
const serverSockets = new Set<any>();
let wss = null as WebSocket.Server | null;

export default async function build(program: Command) {
    program
    .command("start")
    .description("Start the server")
    .action(async () => {
      process.env.PORT = process.env.PORT || "3000";
      glob.clients = [] as WebSocket[];

      process.on("SIGINT", () => {
        destroySockets(serverSockets);
        process.exit(0);
      })

      process.on("SIGTERM", () => {
        destroySockets(serverSockets);
        process.exit(0);
      })

      process.on("exit", () => {
        destroySockets(serverSockets);
        process.exit(0);
      })

      console.clear();

      await startServer();
      // console.log(`
      //   Caff.js version: ${_package.version}
      //   Server is running on http://localhost:${process.env.PORT}
      //   Websocket is running on ws://localhost:${process.env.PORT}
      // `);
    });
}

async function startServer() {
    const sv1 = await createBuild({
      dev: process.env.NODE_ENV === "development",
    })
    wss?.close?.();
    destroySockets(serverSockets);
    if(!server?.address()){
    const {server: _server, wss: websocket} = await sv1.startServer()?.then((res: any) => res).catch((err: any) => {})
    server = _server;
    wss = websocket;

    server?.on("close", () => {
      destroySockets(serverSockets);  
    })

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
        socket?.destroy?.();
    }
    wss?.close?.();
    server?.close?.();

  }