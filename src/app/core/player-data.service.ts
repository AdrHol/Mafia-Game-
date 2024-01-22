import { Injectable } from '@angular/core';
import { Player } from '../shared/model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private players: Player[] = [];
  constructor() { }

  getNumberOfPlayers(){
    return this.players.length;
  }

  createPlayer(id: number, name: string, status: string, role: string | undefined, additionalRole: string | undefined,
              component: any){
    const playerEntity: Player = new Player (id, name, status, role, additionalRole, component);
    component.instance.playerData = playerEntity.getPlayerData();
    this.players.push(playerEntity);
  }
  getPlayerInfo(id: number){
    return this.players.filter(player => player.id === id).map(player => player.getPlayerData());
  }
}
