import { Injectable } from '@angular/core';
import { Player } from '../shared/model/player';
import { RoleAssignment } from '../shared/model/roleAssignment';
import { AdditionalRole } from '../shared/model/additionalRole';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private players: Player[] = [];
  constructor() { }

  getNumberOfPlayers(){
    return this.players.length;
  }

  createPlayer(name: string, status: string, role: RoleAssignment | undefined, component: any){
    const playerEntity: Player = new Player (this.players.length + 1, name, status, role, component);
    component.instance.playerData = playerEntity.getPlayerData();
    this.players.push(playerEntity);
  }
  deletePlayer(id: number){
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

  getPlayerInfo(id: number){
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
}
