import { Command } from "commander";
import chokidar from "chokidar";
import _package from "../../package.json";
import WebSocket from "ws";
import { logger } from "caff-logger";
import { createBuild } from "../core/server/build";
import glob from "../utils/global";
import ora from "ora";
import nodemon from "nodemon";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const spinner = (text: string) => ora(text);

let server = null as any;
const serverSockets = new Set<any>();
let wss = null as WebSocket.Server | null;
let clients = [] as any[];

let isRestarting = false;

let _spinner = spinner("Restarting");

const config = {
  verbose: false,
  watch: [ "src/" ],
  ext: "js, css, ts, tsx, jsx",
  exec: 'yarn start',
}

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

      // // await startServer();
      // console.log(`
      //   Caff.js version: ${_package.version}
      //   Server is running on http://localhost:${process.env.PORT}
      //   Websocket is running on ws://localhost:${process.env.WS_PORT}
      // `);
      nodemon(config);
      // watch
      // chokidar
      //   .watch(["src", `${__dirname}/../../src`])
      //   .on("change", async (path, stats) => {
      //     try {
      //       const timestamp = new Date().getTime();
      //       _spinner.start();

      //       if (isRestarting) {
      //         return;
      //       }
      //       wss?.close?.()
      //       isRestarting = true;

      //       await startServer();
      //       _spinner.stop();
      //       logger.info(`Build completed in ${new Date().getTime() - timestamp}ms`);
      //       isRestarting = false;
      //     } catch (e) {
      //       _spinner.stop();
      //       console.error(e);
      //     } finally {
      //       isRestarting = false;
      //     }
      //   });
    });
}

async function startServer() {
  // Clear module cache related specifically to your app's source code
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });

  // Ensure the old server and WebSocket instances are closed before creating new ones
  if (wss) {
    wss.close();
    wss = null;
  }
  if (server) {
    server.close();
    console.log("Server has been closed.");
    server = null;
  }

  // Destroy any remaining sockets
  destroySockets(serverSockets);
  serverSockets.clear(); // Make sure the set is cleared

  // Start new server instance
  const build = await createBuild();
  const { server: newServer, wss: newWebSocket } = await build.startServer();
  console.log(build?.version)
  server = newServer;
  wss = newWebSocket;

  // Handle new connections
  wss?.on("connection", (socket) => {
    serverSockets.add(socket);
    socket.on("close", () => {
      serverSockets.delete(socket);
    });
  });

  console.log("Server has been restarted with new build.");
}

function destroySockets(sockets: Set<any>) {
  sockets.forEach((socket) => {
    socket.destroy();
  });
}