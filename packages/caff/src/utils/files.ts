import fs from 'fs/promises';
import path from 'path';
import esbuild from 'esbuild';

export const getFilesInNestedDir = async (
    dir: string,
    options: {
      fileContains?: string;
    },
  ) => {
    const files = await fs
      .readdir(dir)
      .then((files) => files.sort())
      .catch(() => []);
    const pages = (await Promise.all(
      files.map(async (file) => {
        const filePath = path.normalize(path.join(dir, file)).replace(/\\/g, "/");
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
          return await getFilesInNestedDir(filePath, options);
        } else {
          if (
            file.includes(options?.fileContains || '') || !options.fileContains
          ) {
            return filePath;
          }
        }
      }) as any,
    )) as any;
    return pages.filter((page?: string) => page).flat(Infinity) as string[];
  };

  interface RouteConfig {
    path: string;
    component: React.ComponentType<any>;
    children?: RouteConfig[];
}


  export async function generateRoutes(basePath: string, filename?: string): Promise<string[]> {
    const routes: string[] = [];

    // Get the list of files and directories in the basePath
    const files = await fs.readdir(basePath);

    for(let file of files) {
      const filePath = path.join(basePath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
          // If it's a directory, recursively generate routes for it
          const nestedRoutes = await generateRoutes(filePath, filename);
          routes.push(...nestedRoutes);
      } else if (stats.isFile() && file.endsWith(filename || 'asdnbhjasdbaskdlas') || !filename) {
          // If it's a file named 'page.tsx', assume it's a page component
          const folderName = path.basename(path.dirname(filePath));
          const routePath = `/${basePath.split('/').slice(-1)[0]}`;
          routes.push(filePath);
      }
  }

    return routes;
}

  export interface BuildOptions extends esbuild.BuildOptions{
    outfiles: string[];
  }

  export const buildFiles = async (files: string[], options: BuildOptions) => {
    let _index = 0
    if(options?.outfiles?.length !== files?.length){
      throw new Error('outfiles length should be equal to files length')
    }
    for (const file of files) {
      const outfile = options?.outfiles?.[_index]
      _index++
      let _options = options as any
      if (options?.outfiles) {
        _options = {...options}
        delete _options.outfiles
      }
      await esbuild.build({
        ..._options,
        entryPoints: [file],
        bundle: true,
        outfile: outfile,
      })
    }
  }

  export const dynamic = async (path: string) => {
    const uniqueSuffix = new Date().getTime();
    const modulePath = `${process.cwd()}/${path}?v=${uniqueSuffix}`;
    return await import(modulePath);
  };

  export async function writeFile(path: string, contents: string, cb?: any) {
    const dir = path.split('/').slice(0, -1).join('/')
    await fs.mkdir(dir, { recursive: true})

    await fs.writeFile(path, contents, cb)
  }

  export function generateImportsAndRoutes(routesInfo: { path: any; route: any; layout: any; index: any; }[]) {
    let importsText = '';
    let routesText = '';
  
    const uniqueLayouts = new Set();
    let layoutCount = 0;
    // Generate imports and routes
    routesInfo.forEach(({ path, route, layout, index }) => {
      const pageImportName = index
      const layoutImportName = `LAYOUT_${index.replace('PAGE_', '')}`;
      importsText += `import ${pageImportName} from '../${path}';\n`;
  
      if (!uniqueLayouts.has(layout)) {
        uniqueLayouts.add({
          layout,
          index: layoutCount,
        });
        layoutCount++;
        importsText += `import ${layoutImportName} from '../${layout}';\n`;
      }
  
      routesText += `          <Route path="${route}" element={<${pageImportName}/>} />\n`;
    });
  
    // Create Routes component with layout wrapping
    let routesComponent = 'import React from \'react\';\nimport { BrowserRouter as Router, Routes, Route } from \'react-router-dom\';\n';
    routesComponent += importsText;
    routesComponent += '\nfunction AppRouter() {\n  return (\n    <Router>\n      <Routes>\n';
  
    uniqueLayouts.forEach((l: any, i) => {
      const index = l.index;
      const layout = l.layout;
      const layoutImportName = `LAYOUT_${index}`;
      routesComponent += `        <Route element={<${layoutImportName} />}> \n`;
      routesInfo.filter((r: { layout: unknown; }) => r.layout === layout).forEach((r: { index: string; route: any; }) => {
        const pageImportName = r.index
        routesComponent += `          <Route path="${r.route}" element={<${pageImportName} />} />\n`;
      });
      routesComponent += '        </Route>\n';
    });
  
    routesComponent += '      </Routes>\n    </Router>\n  );\n}\n\nexport default AppRouter;';
  
    return routesComponent;
  }