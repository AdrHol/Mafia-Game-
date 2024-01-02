import { Injectable } from '@angular/core';
import { RoleAssignment } from '../../shared/model/roleAssignment';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  private numberOfPlayers: number = 0;
  private MAXPLAYERS = 16;
  private MAFIACOUNTS: Map<string, number>;
  private basicRoles: string [] = [];
  private additionalNeutralRoles: string [] = [];
  private additionalNegativeRoles: string [] = [];

  constructor() {
    this.MAFIACOUNTS = new Map();
    this.MAFIACOUNTS.set("TIER0", 1);
    this.MAFIACOUNTS.set("TIER1", 2);
    this.MAFIACOUNTS.set("TIER2", 3);
    this.MAFIACOUNTS.set("TIER3", 4);
    this.MAFIACOUNTS.set("TIER4", 5);
  }

  getPlayersCount(){
    return this.numberOfPlayers;
  }
  addPlayer(){
    if(this.numberOfPlayers < this.MAXPLAYERS){
      this.numberOfPlayers++;
    }
  }
  removePlayer(){
    if(this.numberOfPlayers > 0){
      this.numberOfPlayers--;
    }
  }
  prepareRoles(){
    const mafia = this.computeMafiaMembers();

    if(mafia === undefined){
      alert("Mafia is undefined");
      return;
    }

    let citizens = this.getPlayersCount() - mafia;
    for (let i = 0; i < citizens ; i++){
      this.basicRoles.push("Citizen");
    }
    for(let i = 0; i < mafia ; i++ ){
      this.basicRoles.push("Mafia");
    }
  }
  drawRole(){
    const lenghtOfRoles = this.basicRoles.length;
     if(lenghtOfRoles > 0){
      const randomIndex = Math.floor(Math.random() * lenghtOfRoles);
      const basicRole = this.basicRoles.splice(randomIndex, 1)[0];
      const additionalRole = basicRole === "Maifa"? this.additionalNegativeRoles.pop() : this.additionalNeutralRoles.pop(); 
      return new RoleAssignment(basicRole, additionalRole);
     } else {
      alert("No roles to draw");
      return
     }
  }

  private computeMafiaMembers(){
    const memebers = this.getPlayersCount();
    switch(true) {
      case memebers < 6:
        return this.MAFIACOUNTS.get("TIER0");
      case memebers <= 7:
        return this.MAFIACOUNTS.get("TIER1");
      case memebers <= 10:
        return this.MAFIACOUNTS.get("TIER2");
      case memebers <= 13:
        return this.MAFIACOUNTS.get("TIER3");
      case memebers <= 16:
        return this.MAFIACOUNTS.get("TIER4");
      default:
        return 0;
    }
  }

}