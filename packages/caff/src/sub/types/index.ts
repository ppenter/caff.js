export interface CaffWebsocket extends WebSocket {
    id: string;
    on: (event: string, listener: (...args: any[]) => void) => void;
}

export interface WebsocketContext {
    ws: CaffWebsocket;
    message: string;
    params: {
        [key: string]: any;
    };
    data: {
        [key: string]: any;
    };
    clients: Set<WebSocket>;
}