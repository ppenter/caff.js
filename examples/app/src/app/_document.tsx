import React from "react";

export default function Document({children}: any){
    return (
        <html>
            <head>
                <title>Neat.js</title>
            </head>
            <body>
                <div id="root">
                {children}
                </div>
            </body>
        </html>
    )
}