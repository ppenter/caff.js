type RouteParams = { [key: string]: string };

export function matchPath(inputPath: string, routes: string[]): [string, RouteParams] | null {
    const cleanInputPath = inputPath.startsWith('/') ? inputPath : '/' + inputPath;

    for (const route of routes) {
        const { regex, paramNames } = pathToRegex(route);
        const match = regex.exec(cleanInputPath);

        if (match) {
            const params = extractParams(paramNames, match);
            return [route, params];
        }
    }

    return null;
}

function pathToRegex(path: string): { regex: RegExp, paramNames: string[] } {
    const paramNames: string[] = [];
    let regexString = path
        .split('/')
        .map(segment => {
            if (segment.startsWith(':')) {
                paramNames.push(segment.slice(1));
                return '([^\/]+)';
            } else if (segment === '*') {
                paramNames.push('*');
                return '(.*)';
            } else {
                return segment.replace(/([+?^=!:${}()|\[\]\\])/g, '\\$&');
            }
        })
        .join('\\/');

    return { regex: new RegExp(`^${regexString}$`), paramNames };
}

function extractParams(paramNames: string[], match: RegExpExecArray): RouteParams {
    const params: RouteParams = {};
    // Assign matched values to corresponding parameter names
    paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
    });
    return params;
}

export function checkDupeRoutes(routes: string[]): string[] {
    const duplicateRoutes = routes.map((route, index) => {
        return {
            route,
            dupe: routes.slice(index + 1).includes(route)
        }
    }).filter((r) => r.dupe)
    const wildCardRoutes = routes.filter((route) => {
        return route.split("/").filter(p => p != '').every((part) => {
            return part.includes(":") || part.includes("*")
        }) && route != '/'
    })

    const wildCardDupe = wildCardRoutes.map((route, index) => {
        return routes.map((r) => {
            const _route = route.split("/").filter(p => p != '')
            const _r = r.split("/").filter(p => p != '')
            if(route == r){
                return {
                    route,
                    dupe: false
                }
            }else{
                return {
                    route,
                    dupe: _route.length == _r.length
                }
            }
        })
    })
    .flat().filter((r) => r.dupe)

    const allDupe = [...duplicateRoutes, ...wildCardDupe]
    if (allDupe.length > 0) {
        return allDupe.map((r) => r.route).filter((route, index, self) => self.indexOf(route) === index)
    }
    return []
}

export const isApiFolder = (path: string) => {
    return path.startsWith("/api")
}