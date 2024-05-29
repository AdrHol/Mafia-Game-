import { Component, OnInit, AfterViewInit} from '@angular/core';
import { WebSocketService } from '../../core/web-socket.service';
import { IMessage } from '@stomp/stompjs';
import { ActivatedRoute } from '@angular/router';
import { GameStateObject } from '../../shared/model/GameStateObject';
import { PlayerData } from '../../shared/model/PlayerData';

@Component({
  selector: 'app-player-view',
  standalone: true,
  imports: [],
  templateUrl: './player-view.component.html',
  styleUrl: './player-view.component.css'
})
export class PlayerViewComponent implements AfterViewInit {

  private sub: any = null;
  private test: any | undefined;
  private playerData: PlayerData;
  private roomId: string | null = null;

  constructor(private websocket: WebSocketService, private route: ActivatedRoute){
    this.websocket.connectEvent.subscribe((event)=> {
      if(event){
        console.log('Subsrcribing to topic')
        this.subscribeToStateTopic();
        this.subscribeToPrivateTopic();
      }
    })
    this.playerData = new PlayerData();
  }

 ngAfterViewInit(): void {
  const name = this.route.snapshot.queryParamMap.get('name');
  this.roomId = this.route.snapshot.queryParamMap.get('room');

  this.websocket.connect(name);
  console.log(this.websocket.getStatus());
  this.playerData.setName(name);
 }

 sendTestMessage(){

 }

 subscribeToStateTopic(){
  this.test = this.websocket.subscribeToTopic(`/topic/room/${this.roomId}`,(message: IMessage)=> {
    console.log(message);
  }, this.playerData.getName() || "empty", "empty");
 }
 
 subscribeToPrivateTopic(){
  this.websocket.subscribeToTopic(`/player/queue/users`, (message: IMessage) => {
    const payload: GameStateObject = JSON.parse(message.body);
    this.updateState(payload);
  }, this.playerData.getName() || "", "");
 }

 updateState(payload : GameStateObject){
  console.log("Payload : ");
  console.log(payload);
 }
}
