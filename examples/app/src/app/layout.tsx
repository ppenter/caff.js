import React from "react";

export default function Layout({children}: any){
    const [state, setState] = React.useState("");

    return (
        <div>
            <h1>Neat.js</h1>
            <p>The VERY fullstack web development framework</p>
            {children}
        </div>
    )
}