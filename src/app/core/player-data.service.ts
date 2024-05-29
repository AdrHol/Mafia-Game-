import { Injectable, Injector} from '@angular/core';
import { Player } from '../shared/model/player';
import { RoleAssignment } from '../shared/model/roleAssignment';
import { AdditionalRole } from '../shared/model/additionalRole';
import { WebSocketService } from './web-socket.service';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from '@stomp/stompjs';
@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private players: Player[] = [];
  private sub: any;

  constructor(private websocket: WebSocketService) {
  }

  openConnection(){
    this.websocket.connect('Host');
  }

  getNumberOfPlayers(){
    return this.players.length;
  }
  
  getWebSocket(){
    return this.websocket;
  }

  createPlayer(id: string | undefined, name: string, status: string, role: RoleAssignment | undefined, component: any){
    const playerId = id ? id : (this.players.length + 1).toString();
    const playerEntity: Player = new Player (playerId, name, status, role, component);
    component.instance.playerData = playerEntity.getPlayerData();
    this.players.push(playerEntity);
  }

  deletePlayer(id: string){
    const playerEntity = this.players.filter(player => player.id === id)[0];

    if(playerEntity){
      playerEntity.playerComponent.destroy();
      playerEntity.unsubscribe();
      this.players = this.players.filter(element => element !== playerEntity);
    }

    return playerEntity !== undefined; 
  }
  assignRoles(roles: RoleAssignment[]){
    let rolesCopy = roles.slice();

    this.players.forEach(player => {
      const role = rolesCopy.pop();
      if(role){
        player.role = role;
        player.playerComponent.instance.applyRole(role);
      }
    })
  }

  getPlayerInfo(id: string){
    return this.players.filter(player => player.id === id).map(player => player.getPlayerData());
  }

  getAdditionalRolesList(){
    return this.players.filter(player => player.role !== undefined && player.role?.additionalRole !== undefined)
                       .map(player => player.role!.additionalRole as AdditionalRole);
  }
  getCountOfActiveCitizens(){
    return this.players.filter(player => player.role?.basicRole === 'Citizen' && player.status === 'alive').length;
  }
  getCountOfActiveMafia(){
    return this.players.filter(player => player.role?.basicRole === 'Mafia' && player.status === 'alive').length;
  }

  sendState(){
    this.players.forEach((player)=>{
      const body = {
        playerId: player.id,
        playerName: player.name,
        gameStared: false,
        isPlayerAlive: false,
        playerRole: player.role
      };
      this.websocket.sendMessage(body);
    })
  }

  sendTest(){
    
  }
}
