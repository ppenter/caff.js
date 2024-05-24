export const MSG = ({ws, message, params}: any) => {
    ws.send("PONG")
}