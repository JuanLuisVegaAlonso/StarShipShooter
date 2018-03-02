import { GameInstance } from "./gameInstance";

export class GameInstanceWebSocket {
    webSocket: WebSocket;
    gameInstance: GameInstance;

    constructor(url:string,port:number,gameInstance:GameInstance) {
        this.webSocket = new WebSocket('ws://'+url+':'+port);
        this.gameInstance = gameInstance;
     }

    ngOnInit() {


        this.webSocket.onopen = () => {
            // connection is opened and ready to use
        };

        this.webSocket.onerror = (error) => {
            // an error occurred when sending/receiving data
        };

        this.webSocket.onmessage = (message) => {
            // try to decode json (I assume that each message
            // from server is json)
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ',
                    message.data);
                return;
            }
            // handle incoming message
        };
    }

    public sendToServer() {
        this.webSocket.send(this.gameInstance);
    }
}