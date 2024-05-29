import { EventEmitter, Injectable, Output } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, IMessage, StompHeaders } from '@stomp/stompjs';
import { GameStateObject } from '../shared/model/GameStateObject';
import { stringify } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private client: Client | undefined;

  @Output()
  connectEvent: EventEmitter<boolean> = new EventEmitter();;


  constructor() {}

connect(login: string | null){
 this.client = new Client({
      brokerURL: 'ws://localhost:8080/game',
      connectHeaders: {
        login: login || 'login',
        passcode: 'password',
      },
      debug: function (str) {
        console.log(str);
      },
      onConnect: ()=> {
        console.log("Connected");
        this.connectEvent.emit(true);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
 
    if(this.client){
      this.client.webSocketFactory = function(){
        return new SockJS('http://localhost:8080/game');
      };
    }

    this.client.activate();
  }

  getStatus(){
    return this.client?.connected;
  }

  sendMessage(content: GameStateObject){
    this.client?.publish({destination: '/app/game-state-topic', body: JSON.stringify(content)});
  }
  
  subscribeToTopic(topic: string, calllback: (message: IMessage) => void, login: string, token: string){
    setTimeout(()=>{
      return this.client?.subscribe(topic, 
                                    calllback,
                                    {'login' : login,
                                     'adminToken' : token});
    }, 1000)
  }
  subscribeToPrivateTopic(topic:string, callback: (message: IMessage) => void){
    return this.client?.subscribe(topic, callback);
  }

}


   