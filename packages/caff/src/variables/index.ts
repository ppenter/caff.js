import { dynamic } from "../utils/files";

export interface ICaffConfig {
    outDir: string;
    srcDir: string;
    serverDir: string;
    clientDir: string;
    dist2Dir: string;
    appDir: string;
    publicDir: string;
    preserve: {
        page: string;
        layout: string;
        api: string;
        message: string;
        data: string;
    }
}

export const getConfig = async (): Promise<ICaffConfig> => {
    const _config = await (await dynamic("caff.config.js")).default()
    return {
        outDir: ".caff",
        srcDir: "src",
        serverDir: ".caff/server",
        clientDir: ".caff/client",
        appDir: "src/app",
        publicDir: "src/public",
        dist2Dir: ".caff/dist2",
        ..._config,
        preserve: {
            page: "page.tsx",
            layout: "layout.tsx",
            api: "api.tsx",
            message: "message.tsx",
            data: "data.ts",
            ..._config?.preserve
        },
    }
}

export let config = (global as any).caffConfig as ICaffConfig