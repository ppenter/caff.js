import React from 'react';
import express from "express"
import { WebSocketServer } from 'ws';
import { getConfig } from "../../variables";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import logger from '../../sub/logger';
import { context } from '../../sub/context';
import { matchPath } from '../../utils/matchPath';
import glob from '../../utils/global';
import { rewritePath } from '../../utils/rewritePath';

export interface IFileMeta {
    path: string;
    route?: string;
    rewrite?: string;
    index: string;
    layout?: string;
    hirachy?: string[];
}

export interface ServerOptions {
    files?: {
        pages?: any[]
        layouts?: any[]
        messages?: any[]
        apis?: any[]
        datas?: any[],
        events?: any[]
    },
    imports?: {
        pages?: any[]
        layouts?: any[]
        messages?: any[]
        apis?: any[]
        datas?: any[],
        events?: any[]
    },
    App?: any,
    Helmet?: any
}

export const createServer = async (options?: ServerOptions) => {
    const config = await getConfig()
    glob.caffConfig = config
    const rewrites = glob.caffConfig.rewrites
    const PORT = process.env.PORT || config?.port || 3000
    const WS_PORT = config?.wsPort || parseInt(PORT?.toString()) + 1

    const app = express()

    app.use((req, res, next) => {

        let _url = rewritePath(req.path, rewrites || [])
        if(_url !== "/dist/client.js"){
            if(_url !== req.path){
                logger.info(`[REQUEST] ${req.path} -> ${_url}`)
            }else{
                logger.info(`[REQUEST] ${req.path}`)
            }
        }
        
        req.url = _url
        next()
    })

    app.use((req, res, next) => {
        context.run(new Map, () => {
            const store = context?.getStore() as any
            store?.set('req', req)
            next()
        })
    })

    app.use('/dist', express.static(config.clientDir))
    app.use('/dist2', express.static(config.dist2Dir))
    app.use('/public', express.static(config.publicDir))

    for(let api of options?.imports?.apis || []){
        app.use(api.path, async (req, res) => {
            const method = req.method
            if(api?.import) {
                return api?.import?.[method.toUpperCase()]?.(req, res)
            }else{
                res.status(404).send('Not Found')
            }
        })
    }

    app.get('*', async (req, res) => {
        const App = options?.App as any
        const Helmet = options?.Helmet as any
        const datas = options?.imports?.pages?.map((data: any) => {
            return data?.path
        }) || []

        const match = matchPath(req.path, datas)
        console.log(req.path, datas)

        const data = options?.imports?.datas?.find((data: any) => {
            return data?.path === match?.[0]
        })?.import?.data

        if(!match){
            return res.status(404).send('Page Not Found')
        }

        const props = await data?.(req, res)

        const { pipe } = renderToPipeableStream(
            <StaticRouter location={req.url}>
                <Helmet>
                    <App {...props} {...match?.[1]} />
                </Helmet>
            </StaticRouter>
        , {
            bootstrapScripts: ['/dist/client.js'],
            onShellReady() {
              res.setHeader('content-type', 'text/html');
            //   inject scripts
            const script = `
                <script>
                    window.__INITIAL__DATA__ = ${JSON.stringify(props)};
                </script>
            `
            res.write(script);
              pipe(res);
            },
            onShellError(error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
          });
        // res.sendFile(`${process.cwd()}/src/public/index.html`)
    })

    let server = app.listen(3000, () => {

    });

    if (!config?.wsPort) {
        return {server: server}
    }

    const wss = new WebSocketServer({ port: WS_PORT })


    wss.on('connection', function connection(ws) {
        ws.on('message', async function incoming(message) {
            const _message = message?.toString()
            const routes = options?.imports?.messages?.map((msg: any) => {
                return msg?.path
            }).sort((a, b) => a?.includes("*") ? 1 : -1) || []
            const isMatch = matchPath(_message, routes, "|")
                if(isMatch){
                    options?.imports?.messages?.find(async (msg: any) => {
                        if(msg?.path === isMatch?.[0]){
                            await msg?.import?.MSG?.({
                                ws: ws,
                                params: isMatch?.[1],
                                message: _message
                            })
                        }
                    })
                }
        });

        options?.imports?.events?.map((event: any) => {
            ws.on(event?.path, async (data) => {
                await event?.import?.EVENT?.({
                    ws: ws,
                    data: data
                })
            })
        })
    })

    server.on('close', () => {
        wss.close()
    })

    process.on('SIGINT', () => {
        wss.close()
        process.exit()
    })

    return {server: server, wss: wss}
}