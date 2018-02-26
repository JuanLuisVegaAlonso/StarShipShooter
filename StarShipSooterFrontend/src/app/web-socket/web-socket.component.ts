import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.scss']
})
export class WebSocketComponent implements OnInit {

  webSocket: WebSocket;
  message = '';
  messages: string[]  =[];

  constructor() { }

  ngOnInit() {


    this.webSocket = new WebSocket('ws://127.0.0.1:1337');

    this.webSocket.onopen = () =>  {
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
        this.messages.push(json);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',
            message.data);
        return;
      }
      // handle incoming message
    };
  }

  public sendMessage(){
    this.webSocket.send(this.message);
    this.message = '';
  }

}
