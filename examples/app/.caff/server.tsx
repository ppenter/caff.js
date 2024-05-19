
import { createServer } from 'caff';
import App from './App.tsx';
import Helmet from '../src/app/_document.tsx';
import * as API_0 from '../src/app/api/route.ts';

import PAGE_0 from '../src/app/page.tsx';

export async function startServer(){
    return await createServer({
        App: App,
        Helmet: Helmet,
        imports: {
            apis: [{import: API_0, path: "/api"}],
            datas: [],
            pages: [{import: PAGE_0, path: "/"}],
        }
    })
}
        