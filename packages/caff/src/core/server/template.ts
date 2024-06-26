import { pathToRoute } from "../../utils/hooks";
import { IFileMeta } from "./server";

export interface IAppProps {
    pages: IFileMeta[];
    layouts: string[];
}

export interface IRouteProps {
    layout: string;
    children: string[];
    route: string;
}

class Templates {
    App(props: IAppProps){
        const config = (global as any).caffConfig
        function createHirachy(page: IFileMeta, hirCount: number){
            let result = ''
            const l = page.hirachy?.[hirCount]
            if(!page.hirachy) return result
            const openingTag =  l ? `<LAYOUT_${props.layouts.indexOf(l)}>` : ''
            const closingTag = l ? `</LAYOUT_${props.layouts.indexOf(l)}>` : ''
            result += openingTag
            if(page.hirachy.length > hirCount){
                result += createHirachy(page, hirCount + 1)
            }else{
                result += `<${page.index} {...props} />`
            }
            result += closingTag
            return result
        }



        return(

            `
import React from 'react';
import { Routes, Route } from 'react-router';
${props.pages.map((page, index) => {
    return `import PAGE_${index} from '../${page.path}';`
}).join("\n")}
${props.layouts.map((path: any, index: any) => {
    return `import LAYOUT_${index} from '../${path}';`
}).join("\n")}

export default function App(props){
    return(
        <Routes>
        ${props.pages.map((page, index) => {
            // console.log(page.hirachy, props.layouts, page.path)
            let comp = `
            <Route path="${page.route}" element={
                ${createHirachy(page, 0)}
            }>
                
            </Route>
        `
            return comp
    }).join("\n")}
        </Routes>
    )
}

`
        )
    }

    client(){
        return`
        import React from 'react';
        import { hydrateRoot } from 'react-dom/client';
        import { BrowserRouter } from 'react-router-dom';
        import App from './App.tsx';
    
        const root = hydrateRoot(document.getElementById('root') as any, 
          <BrowserRouter>
          <App {...(window as any)?.__INITIAL__DATA__}/>
          </BrowserRouter>  
        );

`
    }

    server(glob: any, dev: boolean){
        const files = glob.files
        return `
import { createServer } from 'caff';
import App from './App.tsx';
import Helmet from '../src/app/_document.tsx';
${files.apis.map((apiPath: string, index: any) => {
    return `import * as API_${index} from '../${apiPath}';`
}).join("\n")}
${
    files?.datas?.map((dataPath: string, index: any) => {
        return `import * as DATA_${index} from '../${dataPath}';`
    }).join("\n")}
${
    files?.pages?.map((layoutPath: string, index: any) => {
        return `import PAGE_${index} from '../${layoutPath}';`
    }).join("\n")
}
${
    files?.messages?.map((msgPath: string, index: any) => {
        return `import * as MESSAGE_${index} from '../${msgPath}';`
    }).join("\n")
}
${
    files?.events?.map((eventPath: string, index: any) => {
        return `import * as EVENT_${index} from '../${eventPath}';`
    }).join("\n")
}

export const version = ${Date.now()}


export async function startServer(){
${dev ? `process.env.NODE_ENV = "development"` : `process.env.NODE_ENV = "production"`}
return await createServer({
        App: App,
        Helmet: Helmet,
        imports: {
            apis: [${files.apis.map((apiPath: string, index: any) => {
                const route = pathToRoute(apiPath)
                return `{import: API_${index}, path: "${route}"}`;
            })}],
            datas: [${files?.datas?.map((dataPath: string, index: any) => {
                const route = pathToRoute(dataPath)
                return `{import: DATA_${index}, path: "${route}"}`;
            })}],
            pages: [${files?.pages?.map((layoutPath: string, index: any) => {
                const route = pathToRoute(layoutPath)
                return `{import: PAGE_${index}, path: "${route}"}`;
            })}],
            messages: [${files?.messages?.map((msgPath: string, index: any) => {
                const route = pathToRoute(pathToRoute(msgPath).replace("/ws/messages","") + `/${msgPath?.split("/")?.pop()?.replace(".ts", "")}`).replaceAll("/", "|").replace("|", "")
                return `{import: MESSAGE_${index}, path: "${route}"}`;
            })}],
            events: [${files?.events?.map((eventPath: string, index: any) => {
                const route = pathToRoute(pathToRoute(eventPath).replace("/ws/events","") + `/${eventPath?.split("/")?.pop()?.replace(".ts", "")}`).replaceAll("/", "|").replace("|", "")
                return `{import: EVENT_${index}, path: "${route}"}`;
            })}],
        }
    })
}
        `
    }
}

export const template = new Templates();