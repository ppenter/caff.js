<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</p>
<p align="center">
    <h1 align="center">CAFF.JS</h1>
</p>
<p align="center">
    <em>Caff.js: Brewing Real-time Web Experiences</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/ppenter/caff.js?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ppenter/caff.js?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ppenter/caff.js?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ppenter/caff.js?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/esbuild-FFCF00.svg?style=flat&logo=esbuild&logoColor=black" alt="esbuild">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Sass-CC6699.svg?style=flat&logo=Sass&logoColor=white" alt="Sass">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style=flat&logo=SemVer&logoColor=white" alt="SemVer">
	<br>
	<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=flat&logo=Lodash&logoColor=white" alt="Lodash">
	<img src="https://img.shields.io/badge/Flat-3481FE.svg?style=flat&logo=Flat&logoColor=white" alt="Flat">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
	<img src="https://img.shields.io/badge/Buffer-231F20.svg?style=flat&logo=Buffer&logoColor=white" alt="Buffer">
	<img src="https://img.shields.io/badge/Nx-143055.svg?style=flat&logo=Nx&logoColor=white" alt="Nx">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [Running caff.js](#-running-caff.js)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

The `caff.js` project serves as a full-stack framework that enables seamless development of web applications with real-time capabilities. It offers a robust WebSocket communication system, integrated with a dynamic server and CLI functionality. Developers can easily set up servers, handle incoming requests, and implement interactive features such as collaborative drawing and message broadcasting. With hot reload functionality and a structured layout system, `caff.js` streamlines the development process, fostering efficient server-side and client-side rendering. This project empowers developers to create engaging real-time applications with ease, enhancing user experience and interaction.

---

##  Features

|    | Feature          | Description                                                                                                                                          |
|----|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⚙️  | **Architecture** | Relies on various external libraries and utilities for functionality. Uses a modular structure for better organization and code maintenance.            |
| |  |`Work on progress`


---

##  Repository Structure

```sh
└── caff.js/
    ├── README.md
    ├── examples
    │   └── websocket
    │       ├── caff.config.js
    │       ├── package.json
    │       ├── src
    │       │   └── app
    │       │       ├── @api
    │       │       ├── @websocket
    │       │       ├── _components
    │       │       ├── _document.tsx
    │       │       ├── layout.tsx
    │       │       ├── page.tsx
    │       │       └── style.css
    │       └── tsconfig.json
    ├── nx.json
    ├── package.json
    ├── packages
    │   ├── caff
    │   │   ├── .gitignore
    │   │   ├── README.md
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── cli.tsx
    │   │   │   ├── commands
    │   │   │   │   ├── build.ts
    │   │   │   │   ├── dev.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   └── start.ts
    │   │   │   ├── core
    │   │   │   │   └── server
    │   │   │   ├── index.ts
    │   │   │   ├── sub
    │   │   │   │   ├── context
    │   │   │   │   ├── hooks
    │   │   │   │   ├── logger
    │   │   │   │   └── types
    │   │   │   ├── utils
    │   │   │   │   ├── files.ts
    │   │   │   │   ├── global.ts
    │   │   │   │   ├── hooks.ts
    │   │   │   │   ├── matchPath.ts
    │   │   │   │   └── rewritePath.ts
    │   │   │   └── variables
    │   │   │       └── index.ts
    │   │   └── tsconfig.json
    │   ├── caff-logger
    │   │   ├── .gitignore
    │   │   ├── README.md
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   └── index.ts
    │   │   └── tsconfig.json
    │   ├── create-caff-app
    │   │   ├── .gitignore
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   └── index.ts
    │   │   └── tsconfig.json
    └── yarn.lock
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                        | Summary                                                                                                                                                                                                          |
| ---                                                                         | ---                                                                                                                                                                                                              |
| [nx.json](https://github.com/ppenter/caff.js/blob/master/nx.json)           | Code snippet in caff.js repository:** Located at `packages/caff/src/commands/dev.ts` **Role:** Executes development server **Features:** Configures and starts development server with hot reload functionality. |
| [yarn.lock](https://github.com/ppenter/caff.js/blob/master/yarn.lock)       | Summary:** This code snippet in the `websocket` example within the `caff.js` repository manages configurations for websocket connections, enhancing real-time communication capabilities.                        |
| [package.json](https://github.com/ppenter/caff.js/blob/master/package.json) | Code Summary:**The code snippet in `packages/caff/src/commands/start.ts` initializes core server functionality for the `caff.js` repository, enabling application startup and handling incoming requests.        |

</details>

<details closed><summary>examples.websocket</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                |
| ---                                                                                                | ---                                                                                                                                                                                                                                                    |
| [package.json](https://github.com/ppenter/caff.js/blob/master/examples/websocket/package.json)     | Code snippet in `examples/websocket/package.json` orchestrates build, start, and dev tasks via `caff` commands for a React app incorporating WebSocket functionality. Key dependencies include `react`, `react-router-dom`, and `react-use-websocket`. |
| [tsconfig.json](https://github.com/ppenter/caff.js/blob/master/examples/websocket/tsconfig.json)   | Code in `examples/websocket/tsconfig.json` compiles React JSX to directory `dist`, ensuring strict typing & module resolution.                                                                                                                         |
| [caff.config.js](https://github.com/ppenter/caff.js/blob/master/examples/websocket/caff.config.js) | Code in `caff.config.js` sets WebSocket server port to 3001. Enables WebSocket communication in the `caff` system.                                                                                                                                     |

</details>

<details closed><summary>examples.websocket.src.app</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                              |
| ---                                                                                                      | ---                                                                                                                                                                                                                  |
| [_document.tsx](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/_document.tsx) | Role:** `Document` component in `WebSocket` example**Function:** Renders minimal HTML structure for React app with child components in parent's React framework architecture.                                        |
| [layout.tsx](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/layout.tsx)       | Code Summary:** `layout.tsx` in `examples/websocket/src/app` renders a structured layout for Caff.js web app with key navigation links and a footer, enhancing user experience.                                      |
| [style.css](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/style.css)         | Code snippet in style.css sets font styles for h1, h2, and h3 elements in the websocket app. Enhances visual presentation and user experience in the specified sections.                                             |
| [page.tsx](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/page.tsx)           | Code in `page.tsx` renders Caff.js’s landing page with key features and call-to-action buttons. It showcases React, API, Websocket, and emphasize Caff.js as a fullstack framework. Simple, engaging user interface. |

</details>

<details closed><summary>examples.websocket.src.app.@api</summary>

| File                                                                                                | Summary                                                                                                                                                                        |
| ---                                                                                                 | ---                                                                                                                                                                            |
| [route.ts](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/@api/route.ts) | Role:** Implements a basic GET route handler. **Features:** Handles GET requests with Hello world response. **Architecture:** Part of WebSocket example in caff.js repository. |

</details>

<details closed><summary>examples.websocket.src.app._components</summary>

| File                                                                                                                   | Summary                                                                                                                             |
| ---                                                                                                                    | ---                                                                                                                                 |
| [collabZone.tsx](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/_components/collabZone.tsx) | This code snippet implements a collaborative drawing zone using WebSocket for real-time interactions within the caff.js repository. |

</details>

<details closed><summary>examples.websocket.src.app.@websocket.messages</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                  |
| ---                                                                                                              | ---                                                                                                                                                                                                                      |
| [ping.ts](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/@websocket/messages/ping.ts) | Code in caff.js/examples/websocket/src/app/@websocket/messages/ping.ts sends a PONG message via WebSocket. It plays a crucial role in handling message responses within the WebSocket feature of the caff.js repository. |

</details>

<details closed><summary>examples.websocket.src.app.@websocket.messages.update.[x].[y]</summary>

| File                                                                                                                              | Summary                                                                                                                                                                      |
| ---                                                                                                                               | ---                                                                                                                                                                          |
| [call.ts](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/@websocket/messages/update/[x]/[y]/call.ts)   | Code in caff.js/examples/websocket/src/app/@websocket/messages/update/[x]/[y]/call.ts broadcasts updates to all clients in the WebsocketContext using parameters x and y.    |
| [close.ts](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/@websocket/messages/update/[x]/[y]/close.ts) | Code in `close.ts` in `/examples/websocket/src/app/@websocket/messages/update/[x]/[y]/` logs WebSocket close event with client ID. It leverages `WebsocketContext` for data. |

</details>

<details closed><summary>examples.websocket.src.app.@websocket.events</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                     |
| ---                                                                                                              | ---                                                                                                                                                                                                                         |
| [close.ts](https://github.com/ppenter/caff.js/blob/master/examples/websocket/src/app/@websocket/events/close.ts) | Code Summary:** `close.ts`An event handler emitting a close signal to WebSocket clients with an active connection, utilizing a provided context. Facilitates WebSocket communication in the `caff` repository architecture. |

</details>

<details closed><summary>packages.caff</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                        |
| ---                                                                                         | ---                                                                                                                                                                                                                            |
| [package.json](https://github.com/ppenter/caff.js/blob/master/packages/caff/package.json)   | Code snippet in `caff` package achieves CLI functionality by executing build and dev scripts for TypeScript compilation, enabling project setup and code modification.**                                                       |
| [tsconfig.json](https://github.com/ppenter/caff.js/blob/master/packages/caff/tsconfig.json) | Role:** `packages/caff/tsconfig.json` configures TypeScript compilation settings for the `caff` package in the repository.**Key Features:** Enable React JSX, strict mode, ES module interoperability, and output to `./dist`. |

</details>

<details closed><summary>packages.caff.src</summary>

| File                                                                                  | Summary                                                                                                                                                                                                       |
| ---                                                                                   | ---                                                                                                                                                                                                           |
| [cli.tsx](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/cli.tsx)   | Code Summary:**The `cli.tsx` file in the `caff` package dynamically registers and executes commands using the `commander` library, enhancing the CLI functionality of the parent repository's architecture.   |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/index.ts) | Summary:**The code snippet in `caff/src/index.ts` exposes `createServer` from `core/server` to build servers, a critical feature for handling backend functionalities in the CAFF.js repository architecture. |

</details>

<details closed><summary>packages.caff.src.core.server</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                |
| ---                                                                                                     | ---                                                                                                                                                                                                                                    |
| [server.tsx](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/core/server/server.tsx)   | Summary: The code snippet implements a Node.js server using Express with WebSocket capabilities. It handles routing, middleware, static file serving, and WebSocket connections based on specified options and configurations.         |
| [template.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/core/server/template.ts) | Code Summary:** `template.ts` in `caff` core server handles route rendering for server-side and client-side React applications, embracing a hierarchical layout system. It orchestrates route creation with predefined configurations. |
| [build.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/core/server/build.ts)       | Code Summary:**The code in `build.ts` orchestrates a build process for a Caff server, handling file generation, route management, and server and client build tasks based on configuration, using templates and plugins.               |

</details>

<details closed><summary>packages.caff.src.core.server.plugins</summary>

| File                                                                                                                                | Summary                                                                                                                                                                                                    |
| ---                                                                                                                                 | ---                                                                                                                                                                                                        |
| [native-node.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/core/server/plugins/native-node.ts)               | Code Summary:**Code in `native-node.ts` plugin resolves and loads.node files efficiently using virtual namespaces in the parent repo's core server architecture, enhancing module integration.             |
| [babel-remove-unuse.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/core/server/plugins/babel-remove-unuse.ts) | Code summary: **babel-remove-unuse.ts** optimizes the codebase by removing unused Babel plugins. It boosts build performance and reduces bundle size, aligning with the repository's modular architecture. |

</details>

<details closed><summary>packages.caff.src.core.server.components</summary>

| File                                                                                                         | Summary                                                                                                                                                                                       |
| ---                                                                                                          | ---                                                                                                                                                                                           |
| [html.tsx](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/core/server/components/html.tsx) | Code in `html.tsx` (packages/caff/src/core/server/components) provides a base HTML structure for Neat.js, rendering child components. It establishes the main layout for the web application. |

</details>

<details closed><summary>packages.caff.src.utils</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                          |
| ---                                                                                                     | ---                                                                                                                                                                                                                              |
| [matchPath.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/utils/matchPath.ts)     | Code snippet in `matchPath.ts` validates and extracts params from routes based on input path. Enhances route matching functionality in the Caff project architecture.                                                            |
| [rewritePath.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/utils/rewritePath.ts) | Code Summary:**`rewritePath` function efficiently rewrites URL paths based on specified rules in `PathRewriteRule` format. Enhances routing flexibility and customization within the `caff` repository structure.                |
| [global.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/utils/global.ts)           | Global Access Module:**Path: packages/caff/src/utils/global.tsEnhances global object access for repository modules efficiently.                                                                                                  |
| [hooks.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/utils/hooks.ts)             | Code snippet in `hooks.ts` assists in migrating file paths to route paths. It performs path transformations based on config settings, ensuring proper route extraction and API file identification within the `caff` repository. |
| [files.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/utils/files.ts)             | Code snippet summary:**Generates routes dynamically based on file structure. Imports and builds components. Supports nested directories. Enhances route generation for React applications within the repository.                 |

</details>

<details closed><summary>packages.caff.src.sub.types</summary>

| File                                                                                            | Summary                                                                                                                                                                                                               |
| ---                                                                                             | ---                                                                                                                                                                                                                   |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/sub/types/index.ts) | Code Summary:**Enhances websocket functionality in the caff package. Defines WebSocket interfaces and context for message handling and client management. Aligns with broader architecture of the caff.js repository. |

</details>

<details closed><summary>packages.caff.src.sub.context</summary>

| File                                                                                              | Summary                                                                                                                                                                                |
| ---                                                                                               | ---                                                                                                                                                                                    |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/sub/context/index.ts) | Code Summary:**The code snippet in `/packages/caff/src/sub/context/index.ts` manages request context using `AsyncLocalStorage`. It retrieves the request data within the architecture. |

</details>

<details closed><summary>packages.caff.src.sub.logger</summary>

| File                                                                                             | Summary                                                                                                                                                                        |
| ---                                                                                              | ---                                                                                                                                                                            |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/sub/logger/index.ts) | Role:** Integrates logger module from caff-logger package. Enhances logging functionality across the caff project. Improves development monitoring and debugging capabilities. |

</details>

<details closed><summary>packages.caff.src.sub.hooks</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                                                                     |
| ---                                                                                                     | ---                                                                                                                                                                                                                                                                                         |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/sub/hooks/index.ts)         | Role:** Facilitates routing functionality in caff.js architecture.**Features:** Exports useRouter hook for navigating paths efficiently.**Relationship:** Serves as integral part within caff.js repository's routing system.                                                               |
| [useRouter.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/sub/hooks/useRouter.ts) | Code Summary:**Located in `packages/caff/src/sub/hooks/useRouter.ts`, this code snippet enables routing functionality by leveraging React Router's `useLocation` and `useNavigate`. It provides methods for navigation, accessing pathname and query parameters, and handling page refresh. |

</details>

<details closed><summary>packages.caff.src.variables</summary>

| File                                                                                            | Summary                                                                                                                                                                                                             |
| ---                                                                                             | ---                                                                                                                                                                                                                 |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/variables/index.ts) | Code snippet in `packages/caff/src/variables/index.ts` fetches configuration from `caff.config.js` and merges it with default settings, supplying `ICaffConfig` for repository's file structure and variable setup. |

</details>

<details closed><summary>packages.caff.src.commands</summary>

| File                                                                                           | Summary                                                                                                                                                                                                        |
| ---                                                                                            | ---                                                                                                                                                                                                            |
| [dev.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/commands/dev.ts)     | Code snippet in `dev.ts` manages server restarts and file changes using nodemon and chokidar, facilitating continuous development. It maintains WebSocket connections and initiates server updates.            |
| [start.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/commands/start.ts) | Summary: Code in packages/caff/src/commands/start.ts initiates production server with WebSocket support in Caff.js. Manages server lifecycle and WebSocket connections, offering version info and run details. |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/commands/index.ts) | Role:** Entry point for CLI commands in caff.js.**Features:** Exports build, start, dev commands for CLI functionality. Integrates commands in parent repository's architecture.                               |
| [build.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff/src/commands/build.ts) | Summary:**The `build.ts` code snippet in `caff` repo's `commands` creates a build command using the Commander library to trigger a project build via `createBuild` function from the server's core.            |

</details>

<details closed><summary>packages.create-caff-app</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                            |
| ---                                                                                                    | ---                                                                                                                                                                                                                                |
| [package.json](https://github.com/ppenter/caff.js/blob/master/packages/create-caff-app/package.json)   | Code Summary: create-caff-app**Creates Caff projects with logging and CLI handling. Uses Node.js, TypeScript, and Commander for project scaffolding. Key features include project setup, logging integration, and CLI interaction. |
| [tsconfig.json](https://github.com/ppenter/caff.js/blob/master/packages/create-caff-app/tsconfig.json) | create-caff-app Role**: Compiles React JSX to NodeNext in `dist` dir, enforcing strict type checking, esModuleInterop, and excluding tests, nodes in `node_modules`.                                                               |

</details>

<details closed><summary>packages.create-caff-app.src</summary>

| File                                                                                             | Summary                                                                                                                                                                                                      |
| ---                                                                                              | ---                                                                                                                                                                                                          |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/create-caff-app/src/index.ts) | Summary:****Code snippet creates Caff.js project structure with essential components: `app` folder, `layout`, `page`, `api`, and `websocket`. Config and scripts setup for Caff.js project initialization.** |

</details>

<details closed><summary>packages.caff-logger</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                        |
| ---                                                                                                | ---                                                                                                                                                                                                                            |
| [package.json](https://github.com/ppenter/caff.js/blob/master/packages/caff-logger/package.json)   | Code Summary:** Code in `packages/caff-logger` facilitates logging via `ora` and `prompts` with TypeScript support. It offers build automation and development watch modes.                                                    |
| [tsconfig.json](https://github.com/ppenter/caff.js/blob/master/packages/caff-logger/tsconfig.json) | Code snippet in `/packages/caff-logger/index.ts` enhances logging functionality in the repository's server core. Integrated with structured logging, it ensures detailed monitoring and error tracking across the application. |

</details>

<details closed><summary>packages.caff-logger.src</summary>

| File                                                                                         | Summary                                                                                                                                                                                              |
| ---                                                                                          | ---                                                                                                                                                                                                  |
| [index.ts](https://github.com/ppenter/caff.js/blob/master/packages/caff-logger/src/index.ts) | Code snippet in caff-logger enhances logging and interactive prompts. Facilitates dynamic log level configuration and interactive user input. Supports Winston logging with colorful console output. |

</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**: `version x.y.z`

###  Installation

1. Use create-caff-app cli:

```sh
yarn create caff-app@latest <project-name>
```

2. Change to the project directory:

```sh
cd <project-name>
```

3. Install the dependencies:

```sh
yarn
```

###  Running `caff.js`

Use the following command to run caff.js:

```sh
yarn dev
```

---

##  Project Roadmap

- [X] `► FULLSTACK_BASIC`
- [ ] `► REALTIME_FRAMEWORK`
- [ ] `► ALPHA-TEST`

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/ppenter/caff.js/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/ppenter/caff.js/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/ppenter/caff.js/issues)**: Submit bugs found or log feature requests for the `caff.js` project.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/ppenter/caff.js
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  License

This project is protected under the [GNU AGPLv3](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
