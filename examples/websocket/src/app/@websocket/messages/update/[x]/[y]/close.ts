import { WebsocketContext } from "caff/types"

export const MSG = ({ws, message, params, clients}: WebsocketContext) => {
    console.log("CLOSE", ws.id)
}