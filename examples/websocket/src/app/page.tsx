import { useRouter } from "caff/hooks";
import React from "react";
import useWebSocket from "react-use-websocket";
import CollabZone from "./_components/collabZone";

const features = [
    {
        title: "React",
        description: "Caff.js is built with React. You can use all the features of React in your project."
    },
    {
        title: "API",
        description: "Caff.js has a built-in API server. You can use it to create your own API."
    },
    {
        title: "Websocket",
        description: "Caff.js has a built-in Websocket server. You can use it to create real-time applications."
    },
    {
        title: "Fullstack",
        description: "Caff.js is a fullstack web development framework. You can use it to create fullstack applications."
    },
    {
        title: "Opensource",
        description: "Caff.js is an open-source project. You can contribute to the project on Github."
    },
    {
        title: "Easy to use",
        description: "Caff.js is easy to use. You can create a new project with just one command."
    }
]

const Card = ({title, description}: any) => {
    const router = useRouter();
    return (
        <div className="p-8 w-full border rounded-lg shadow-sm cursor-pointer hover:shadow-lg" onClick={e => {
        }}>
            <h3 className="text-2xl mb-2">
                {title}
            </h3>
            <p>
                {description}
            </p>
        </div>
    )

}

export default function Home({children}: any){

    return (
        <div className="max-w-4xl">
            <div className="p-2 flex flex-col items-center w-full text-center">
            <h1 className="text-6xl mb-4">
                The Only Fullstack Web Development Framework
            </h1>
            <p className="text-zinc-500 text-lg">
                Built-in React, API and Websocket. By fullstack developers, for fullstack developers.
            </p>
            </div>
            {/* Collab Zone */}
            <CollabZone/>
            <div className="p-2 flex flex-col w-full mt-24 text-center">
            <h2 className="text-4xl mb-4">
                Why Caff.js?
            </h2>
            {/* 3 columns feature card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-4">
                {features.map((feature, index) => (
                    <Card key={index} {...feature}/>
                ))}
            </div>

<div className="mt-12 border-t pt-16 pb-16">
    <h2 className="text-4xl mb-4 text-center">
        Start building with Caff.js
    </h2>
    <p className="text-center text-lg">
        Get started with Caff.js in just a few minutes.
    </p>
    <div className="flex justify-center mt-8">
        <button className="bg-black text-white px-4 py-2 rounded-lg">
            Get Started
        </button>
        <button className="bg-zinc-100 text-black px-4 py-2 rounded-lg ml-4">
            Learn More
        </button>
        </div>
</div>
            </div>
        </div>
    )
}