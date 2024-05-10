import React from "react"

export function Helmet({children, props}: any){
    return (
        <html>
            <head>
                <title>Neat.js</title>
            </head>
            <body>
                <div id="root">
                <h1>Neat.js</h1>
                {children}
                </div>
            </body>
        </html>
      );
    };