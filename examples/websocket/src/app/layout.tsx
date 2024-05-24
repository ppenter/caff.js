import React, { useEffect } from "react";
import "../style.css"
import useWebSocket from "react-use-websocket";

export default function Layout({children}: any){
    
    return (
        <div className="pt-32 flex flex-col items-center">
            <div className="fixed flex w-full justify-center p-4 top-0 ">
            <div className="flex p-4 pl-8 pr-8 rounded-full bg-zinc-100 w-full max-w-[480px] justify-between items-center shadow-lg backdrop-blur-sm">
                <a href="/" className="text-2xl font-bold">☕ Caff.js</a>
                <div className="flex font-semibold">
                    <a href="/docs" className="mx-2">Docs</a>
                </div>
            </div>
        </div>
            {children}
            <div className="bg-black w-full p-4 text-white mt-4 text-center">
                {/* Footer */}
                <div className="flex justify-between">
                <p>
                    &copy; 2021 Caff.js | Built with ❤️ 
                </p>
                <div className="flex">
                    <a href="/docs" className="mx-2">Docs</a>
                    <a href="https://github.com/ppenter/caff.js" target="_blank" className="mx-2">Github</a>
                </div>
                </div>
            </div>
        </div>
    )
}