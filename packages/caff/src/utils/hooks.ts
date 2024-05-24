// high file path: (website)/pages/(dashboard)/index.tsx
// low file path: pages/index.tsx

import { getConfig } from "../variables";

export const migrateFilePath = (filePath: string) => {
    // replace many "/" with single "/": "///" -> "/", "//" -> "/", "////" -> "/
    let newPath = filePath.replace(/\/+/g, '\/');
    if (newPath.startsWith("/")) {
        newPath = newPath.slice(1);
    }

    if(newPath.endsWith("/")){
        newPath = newPath.slice(0, newPath.length - 1);
    }
    return newPath;
}

export const migrateRoutePath = (routePath: string) => {
    return `/${migrateFilePath(routePath)}`
}

export const pathToRoute = (path: string) => {
    const config = (global as any)?.caffConfig
    // ex path: src/app/(website)/[message]/page.tsx
    // ex route: /:message
    // 1. remove the appDir
    // 2. remove the page.tsx
    // 3. replace ( and ) with ""
    // 4. replace [...and] with :and*
    // 5. replace [and] with :and
    // 6.  replace @ with ""

    let _path = path
    _path = _path.replace(config.appDir, "")
    // .replace(".tsx", "")
    .replace(/\\/g, "/")
    .replace(/\((.*?)\)/g, "")
    .replace(/\[\.\.\.(.*?)\]/g, "*")
    // .replace(/\[\.\.\.(.*?)\]/g, ":$1*/")
    .replace(/\[(.*?)\]/g, ":$1")
    .replace("/@api", "/api")
    .replace("/@websocket", "/ws")

    if(_path.endsWith("/")){
        _path = _path.slice(0, _path.length - 1);
    }
    _path =_path.split("/").filter((p) => {
        const regex = /[^\[\.\.\.]\.[^.]/;
        return !p.match(regex);
    }).join("/");

    return migrateRoutePath(_path);

}

export const getLowFilePath = (highFilePath: string) => {
    const regex = /\((.*?)\)/;
    return migrateFilePath(highFilePath.replace(regex, ""))
}

export const isApi = (path: string) => {
    return migrateFilePath(path).startsWith("api");
};

export const isApiFile = (filePath: string) => {
    const config = (global as any)?.caffConfig
    // has only 1 "/api" in the path and ends with "route.ts"
    let _path = getLowFilePath(filePath);
    _path.replace(config.appDir, "");
    return isApi(_path) && _path.endsWith("route.ts");
}