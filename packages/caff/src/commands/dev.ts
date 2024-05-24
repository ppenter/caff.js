import { Command } from "commander";
import chokidar from "chokidar";
import _package from "../../package.json";
import WebSocket from "ws";
import { logger } from "caff-logger";
import { createBuild } from "../core/server/build";
import glob from "../utils/global";
import ora from "ora";

const spinner = (text: string) => ora(text);

let server = null as any;
const serverSockets = new Set<any>();
let wss = null as WebSocket.Server | null;
let clients = [] as any[];

let isRestarting = false;

let _spinner = spinner("Restarting");

export default function (program: Command) {
  program
    .command("dev")
    .description("Start the server and watch for changes")
    .action(async () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = process.env.PORT || "3000";
      process.env.WS_PORT = process.env.WS_PORT || "3001";
      glob.clients = [] as WebSocket[];
      console.clear();

      await startServer();
      console.log(`
        Caff.js version: ${_package.version}
        Server is running on http://localhost:${process.env.PORT}
        Websocket is running on ws://localhost:${process.env.WS_PORT}
      `);
      // watch
      chokidar
        .watch(["src", `${__dirname}/../../src`])
        .on("change", async (path, stats) => {
          try {
            const timestamp = new Date().getTime();
            _spinner.start();
            for (const key in require.cache) {
              delete require.cache[key];
            }

            if (isRestarting) {
              return;
            }
            isRestarting = true;

            for (const key in require.cache) {
              delete require.cache[key];
            }
            destroySockets(serverSockets);

            for (const key in require.cache) {
              delete require.cache[key];
            }
            await startServer();
            _spinner.stop();
    logger.info(`Build completed in ${new Date().getTime() - timestamp}ms`);
            isRestarting = false;
          } catch (e) {
            _spinner.stop();
            console.error(e);
          } finally {
            isRestarting = false;
          }
        });
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
        socket?.destroy();
    }
    if(server) {
      server?.close();
    }
  }