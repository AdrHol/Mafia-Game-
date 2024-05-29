import { Component, ComponentRef, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { PlayerCardComponent } from './player-card/player-card.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { AdditionalRolesComponent } from './additional-roles/additional-roles.component';
import { NgClass, NgIf } from '@angular/common';
import { GameLogicService } from './game-logic.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { AdditionalRole } from '../../shared/model/additionalRole';
import { PlayerDataService } from '../../core/player-data.service';
import { IMessage } from '@stomp/stompjs';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [GameboardComponent, NgIf, AdditionalRolesComponent, NgClass],
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css',
})
export class HostDashboardComponent implements OnInit{

  @ViewChild(GameboardComponent, {read: ViewContainerRef})
  playerContainer!: ViewContainerRef;

  @ViewChild('playerName') 
  fullNameInput: any; 

  @ViewChild('additionalRoles')
  additionalRolesComponent: any;

  @ViewChild('startGameButton')
  startGameButton: any;

  roomID: string | undefined;

  additionalRolesList: AdditionalRole[];

  selectedPlayerComponent!: PlayerCardComponent | undefined;

  displayedMessage: string = '';

  constructor(private gameLogicService: GameLogicService, 
              private dataService: DataService,
              private playersService: PlayerDataService,
              private route: ActivatedRoute,){
        this.additionalRolesList = dataService.fetchAdditionalRoles();
  }

  ngOnInit(): void {
    const pathRoomId = this.route.snapshot.paramMap.get('roomid');
    const tokenRoom = this.route.snapshot.queryParamMap.get('auth');
    console.log(tokenRoom);
    console.log(this.route.snapshot);
    if(pathRoomId){
      this.roomID = pathRoomId;
      this.playersService.openConnection();
      this.playersService.getWebSocket().subscribeToTopic(`/topic/room/${pathRoomId}` ,(message: IMessage) => {
        const json = JSON.parse(message.body);
        this.addPlayer(json['name'], json['id']);
      }, 'admin', tokenRoom || "");
    }
  }

  addPlayer(name: string, id: string | undefined){
    if(this.playersService.getNumberOfPlayers() < 16){
      const component = this.playerContainer.createComponent(PlayerCardComponent);
      this.playersService.createPlayer(id, name, "alive", undefined, component);
      const componentInstance = component.instance;

      componentInstance.playerSelected.subscribe(($event)=>{
        this.receiveSelectedPlayer($event);
      });

      this.fullNameInput.nativeElement.value = '';
      this.gameLogicService.addPlayer();
      return false;
    } else {
      this.unsupportedPlayerCount();
      return false;
    } 
    }

    emitTestMessage(){
      this.playersService.sendTest();
    }
    removePlayer(id: string){
      const isDeleted = this.playersService.deletePlayer(id);
      if(isDeleted){
        this.selectedPlayerComponent = undefined;
      }
    }

    receiveSelectedPlayer(playerCard: PlayerCardComponent){
      this.applySelectedPlayerStyle(playerCard);
      this.selectedPlayerComponent = playerCard;
    }
    
    drawRoles(){
      this.gameLogicService.drawRole(this.additionalRolesComponent.getCheckedRoles());
      this.playersService.sendState();
    }

    startGame(event: Event){
      this.gameLogicService.start();
    }

    unsupportedPlayerCount(){
      alert("Maximum number of players is 16");
    }

    private applySelectedPlayerStyle(playerCard: PlayerCardComponent){
      if(this.selectedPlayerComponent !== undefined){
        this.selectedPlayerComponent.removeStyle('selected');
      } 
      playerCard.applyStyle('selected');
    }

    expandAdditionalRoles(){
      this.additionalRolesComponent.switchVisibility();
    }
    checkGameState(){
      return !this.gameLogicService.getGameState();
    }
    getNextMessage(){
      this.displayedMessage = this.gameLogicService.getNextMessage();
    }
}
 