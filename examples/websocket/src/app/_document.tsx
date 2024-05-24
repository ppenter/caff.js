import React from "react";

export default function Document({children}: any){
    return (
        <html>
            <head>
                <meta charSet="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Caff | Fullstack React Framework</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>
                <div id="root">
                {children}
                </div>
            </body>
        </html>
    )
}