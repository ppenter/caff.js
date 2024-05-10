interface PathRewriteRule {
    from: string;
    to: string;
}

function compileRule(rule: PathRewriteRule): { regex: RegExp, paramNames: string[] } {
    let paramNames: string[] = [];
    let regexPattern = rule.from
        .replace(/:[^\s/]+/g, (match) => {
            paramNames.push(match.substr(1));  // Capture the parameter name without the colon
            return '([^/]+)';
        })
        .replace(/\*/g, '(.*)');  // Handle wildcard globally

    regexPattern = regexPattern.replace(/\//g, '\\/');  // Escape slashes
    const regex = new RegExp(`^${regexPattern}$`);
    return { regex, paramNames };
}

export function rewritePath(inputPath: string, rules: PathRewriteRule[]): string {
    for (const rule of rules) {
        const { regex, paramNames } = compileRule(rule);
        const match = inputPath.match(regex);
        if (match) {
            let rewrittenPath = rule.to;
            // Replace wildcard in the 'to' pattern with captured wildcard content
            if (paramNames.length === 0 && rewrittenPath.includes('*')) {  // Only wildcards, no named params
                rewrittenPath = rewrittenPath.replace('*', match[1]);  // Assumes only one wildcard match
            } else {
                paramNames.forEach((name, index) => {
                    rewrittenPath = rewrittenPath.replace(`:${name}`, match[index + 1]);
                    rewrittenPath = rewrittenPath.replace('*', match[match.length - 1] || '');
                });
            }
            return rewrittenPath;
        }
    }
    return inputPath;  // No rule matched; return the original path
}