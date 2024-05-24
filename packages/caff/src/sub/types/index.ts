export interface WebsocketContext {
    ws: WebSocket;
    message: string;
    params: {
        [key: string]: any;
    };
    data: {
        [key: string]: any;
    };
}