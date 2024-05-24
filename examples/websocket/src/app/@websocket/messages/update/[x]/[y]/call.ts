import { WebsocketContext } from "caff/types"

export const MSG = ({ws, message, params, clients}: WebsocketContext) => {
    // Broadcast to all clients
    clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(`update|${ws?.id}|${params?.x}|${params?.y}`)
        }
    })
}