import esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { buildFiles, dynamic, generateRoutes, writeFile } from '../../utils/files';
import { template } from './template';
import { rimraf } from 'rimraf'
import { getConfig } from '../../variables';
import { getLowFilePath, migrateFilePath, migrateRoutePath, pathToRoute } from '../../utils/hooks';
import path from 'path';
import fs from 'fs/promises';
import fss, { PathLike } from 'fs';
import { nativeNodeModulesPlugin } from './plugins/native-node';
import {sassPlugin} from 'esbuild-sass-plugin'
import glob from '../../utils/global';
import { checkDupeRoutes, isApiFolder } from '../../utils/matchPath';


const CSSPlugin = {
    name: "css-inject",
    setup(build: any) {
      // Filter for .tsx files
      build.onLoad(
        { filter: /\.tsx$/ },
        async (args: { path: PathLike | fs.FileHandle }) => {
          let contents = await fs.readFile(args.path, "utf8");
  
          // Regex to find CSS import statements
          const cssImportRegex = /import\s+['"](.+\.css)['"];?/g;
  
          // Replace each CSS import with an inject function
          contents = contents.replace(cssImportRegex, (match, cssPath) => {
            // Resolve the CSS path relative to the .tsx file
            const fullPath = `${path.dirname(args.path.toString())}/${cssPath}`;
            const cssCode = fss
              .readFileSync(fullPath, "utf8")
              .trim()
              .replace(/`/g, "\\`");
            // Return a replacement code that injects the CSS into the document
            return `
            document.head.insertAdjacentHTML("beforeend", \`
                <style>
                    ${cssCode}
                </style>
            \`);
          `;
          });
  
          return { contents, loader: "tsx" };
        },
      );
    },
  };

function lap(title: string, stopwatch: number) {
    // console.log(`${title}: ${Date.now() - stopwatch}ms`)
    return Date.now()
}

interface BuildConfig {
    entry: string;
    output: string;
    mode: 'development' | 'production';
}

export const createBuild = async (options?: any) => {
    const { dev = true } = options || {}
    const time = Date.now()
    const _config = await getConfig();
    let config = _config;
    glob.caffConfig = config
    // delete the build folder
    await rimraf(config.outDir)

    const tsxFiles = await generateRoutes(config.srcDir, ".tsx")
    const tsFiles = await generateRoutes(config.srcDir, ".ts")

    const dataFiles = tsFiles.filter((file) => {
        const isValid1 = !file.includes("@")
        // isVlid2 = Folder name not include _
        const isValid2 = file.split("/").every((f) => {
            return !f.startsWith("_")
        })
        return file.endsWith(config.preserve.data) && isValid1 && isValid2
    })

    const apiFiles = tsFiles.filter((file) => {
        const route = pathToRoute(file)
        return isApiFolder(route)
    })

    await buildFiles(apiFiles, {
        outfiles: apiFiles.map((file) => {
            return `${config.serverDir}/${file.replace(config.srcDir, "").replace(".ts", ".js")}`
        }),
        bundle: true,
        platform: "node",
        target: "node14",
    })

    const layoutFiles = tsxFiles.filter((file) => {
        return file.endsWith(config.preserve.layout)
    })

    const pageFiles = tsxFiles.filter((file) => {
        return file.endsWith(config.preserve.page)
    })

    const pages = pageFiles.map((file, index) => {
        const closestLayout = findClosestLayout(file, layoutFiles);
        return {
            path: file,
            route: pathToRoute(file),
            layout: closestLayout,
            hirachy: getLayoutHierarchy(file, layoutFiles),
            index: `PAGE_${index}`
        }
    })

    const eventFiles = tsFiles.filter((file) => {
        const route = pathToRoute(file)
        const isValid1 = route.startsWith("/ws/events")
        return isValid1
    })

    const msgsFiles = tsFiles.filter((file) => {
        const route = pathToRoute(file)
        const isValid1 = route.startsWith("/ws/messages")
        return isValid1
    })

    glob.files = {
        pages: pageFiles,
        layouts: layoutFiles,
        apis: apiFiles,
        datas: dataFiles,
        events: eventFiles,
        messages: msgsFiles
    }

    // If route in page is duplicated, throw an error
    const routes = pages.map((page) => page.route)
    const isDupe = checkDupeRoutes(routes)

    if (isDupe.length > 0) {
        throw new Error(`Duplicate routes found: ${isDupe}`)
    }

    const AppTSX = template.App({
        pages: pages as any,
        layouts: layoutFiles
    })

    // create the App.tsx file
    await writeFile(`${config.outDir}/App.tsx`, AppTSX)

    // build the App.tsx file
    await esbuild.build({
        entryPoints: [`${config.outDir}/App.tsx`],
        bundle: true,
        outfile: `${config.outDir}/client/App.js`,
        target: "node14",
        platform: "node",
        plugins: [sassPlugin()],
    })
    lap("App.tsx", time)

    let define = {} as any

    define[`process.env.NODE_ENV`] = `"${dev ? "development" : "production"}"`
    // read .env file
    const env = await fs.readFile(`.env`, "utf-8")
    const envLines = env.split("\n")
    envLines.forEach((line) => {
        const [key, value] = line.split("=")
        define[`process.env.${key}`] = `"${value}"`
        process.env[key] = value
    })

    // build the client.tsx file
    const clientTSX = template.client()

    await writeFile(`${config.outDir}/client.tsx`, clientTSX)

    await esbuild.build({
        entryPoints: [`${config.outDir}/client.tsx`],
        bundle: true,
        minify: !dev,
        loader: {
            ".tsx": "tsx",
            ".css": "text",
        },
        plugins: [CSSPlugin, nativeNodeModulesPlugin],
        outfile: `${config.outDir}/client/client.js`,
        define: define
    })
    lap("client.tsx", time)

    // Build data files
    await buildFiles(dataFiles, {
        outfiles: dataFiles.map((file) => {
            return `${config.serverDir}/${file.replace(config.srcDir, "").replace(".ts", ".js")}`
        }),
        bundle: true,
        format: "esm"
    })
    lap("data files", time)

    // create server file
    const serverTSX = template.server(glob, dev)

    await writeFile(`${config.outDir}/server.tsx`, serverTSX)

    // Build Server File
    await esbuild.build({
        entryPoints: [`./${config.outDir}/server.tsx`],
        bundle: true,
        outfile: `${config.outDir}/server.js`,
        loader: {
        ".tsx": "tsx",
        },
        external: ["esbuild"],
        platform: "node",
        plugins: [nativeNodeModulesPlugin],
    });

    lap("server.tsx", time)

    // await fs.rm(`${config.outDir}/client.tsx`)
    // await fs.rm(`${config.outDir}/App.tsx`)
    // await fs.rm(`${config.outDir}/server.tsx`)
    Object.keys(require.cache).forEach((key) => {
        delete require.cache[key];
    });
    return await dynamic(`.caff/server.js`);

}

export const resolvePath = (path: string) => {
    return fileURLToPath(path)
}

function findClosestLayout(pagePath: string, layouts: string[]) {
    let currentDir = path.dirname(pagePath);
    while (currentDir !== path.dirname(currentDir)) {
      const possibleLayout = `${currentDir}/layout.tsx`;
      if (layouts.includes(possibleLayout)) {
        return possibleLayout;
      }
      currentDir = path.dirname(currentDir);
    }
    return null;
}
export function getLayoutHierarchy(page: string, _layouts: string[]): string[] {
    const layouts = _layouts.map((layout) => migrateFilePath(layout.replace('layout.tsx', '')));
    let layoutHierarchy: string[] = [];

    // Find the layout for the current page
    const currentPageLayout = layouts.find(layout => page.startsWith(layout));
    if (currentPageLayout) {
        layoutHierarchy.push(currentPageLayout);
    }

    // Iterate through parent directories to find higher-level layouts
    let currentDir = path.dirname(page);
    while (currentDir !== '.') {
        const parentLayout = layouts.find(layout => currentDir.startsWith(layout));
        if (parentLayout) {
            layoutHierarchy.push(parentLayout);
        }
        currentDir = path.dirname(currentDir);
    }

    // Reverse the layout hierarchy array so that the farthest layout appears first
    // Remove duplicates
    const uniqueLayouts = new Set(layoutHierarchy);
    layoutHierarchy = Array.from(uniqueLayouts);
    return layoutHierarchy.map(layout => `${layout}/layout.tsx`).reverse();
}