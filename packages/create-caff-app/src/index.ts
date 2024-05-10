#! /usr/bin/env node

import ora from "ora";
import _package from "../package.json";
import fs from "fs/promises";

const root = process.argv[2] || "caff-app"

async function main() {

let spinner = ora("Preparing Files and Folder").start();
// Create Project Directory
    await fs.mkdir(root, { recursive: true })
    
    await writeFile("/src/app/_document.tsx", `
import React from "react";

export default function Document({children}: any){
    return (
        <html>
            <head>
                <title>Caff.js</title>
            </head>
            <body>
                <div id="root">
                {children}
                </div>
            </body>
        </html>
    )
}
    `)

    // Create Layout Component
    await writeFile("/src/app/layout.tsx", `
import React from "react";

export default function Layout({children}: any){
    return (
        <div>
            <h1>Caff.js</h1>
            <p>The VERY fullstack web development framework</p>
            {children}
        </div>
    )
}
    `)

    // Create Home Component
    await writeFile("/src/app/page.tsx", `
import React from "react";

export default function Home({children}: any){
    return (
        <>
        This is the home page
        </>
    )
}
`)

// Create Second Page Component
await writeFile("/src/app/hello/page.tsx", `
import React from "react";

export default function Hello({children, message}: any){
    return (
        <>
        This page has some data from the server
        message: {message}
        </>
    )
}
`)

// Create Data File
await writeFile("/src/app/hello/data.ts", `
export const data = {
    message: "This is some ssr data"
}
`)

// Create api folder
await fs.mkdir(`${root}/src/app/api`, { recursive: true })

// Create api file
await writeFile("/src/app/api/hello/route.ts", `
export const GET = (req: any, res: any) => {
    res.send("Hello World")
}
`)

// Create Config File
await writeFile("/caff.config.js", `
module.exports = () => {
    return {
    }
}
`)

// Create tsconfig.json
await writeFile("/tsconfig.json", `
{
"compilerOptions": {
    "module": "NodeNext",
    "jsx": "react", // for React JSX
    "outDir": "./dist", // Output directory for compiled files
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "baseUrl": "./",
},
"include": ["src/**/*"],
"exclude": [
    "node_modules"
]
}
`)

// Create package.json
await writeFile("/package.json", `
{
    "name": "${root}",
    "version": "1.0.0",
    "main": "dist/index.js",
    "license": "MIT",
    "scripts": {
        "start": "caff start",
        "build": "caff build",
        "dev": "caff dev"
    },
    "dependencies": {
        "caff": "^0.0.3",
        "react": "^18",
        "react-dom": "^18",
        "react-router-dom": "^6.23.0"
    },
    "devDependencies": {
        "@types/react": "^18",
        "@types/react-dom": "^18"
    }
}
`)

// Create websocket message file
await writeFile("/src/app/ws/hello/message.ts", `
export const hello = (ws: any, message: any) => {
    ws.send("Hello World")
}
`)
    spinner.succeed("Files and Folders Created")

    console.log(`
    Project Created Successfully
    - cd ${root}
    - npm install
    - npm run dev
    `)
}

main()

export async function writeFile(_path: string, contents: string, cb?: any) {
    const path = `${root}${_path}`
    const dir = path.split('/').slice(0, -1).join('/')
    await fs.mkdir(dir, { recursive: true})
    await fs.writeFile(path, contents, cb)
}