import { WebsocketContext } from "caff/types";

export const EVENT = ({ws, data, clients}: WebsocketContext) => {
    clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(`close|${ws.id}`)
        }
    })
}