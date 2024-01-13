import { Injectable } from '@angular/core';
import { RoleAssignment } from '../../shared/model/roleAssignment';
import { AdditionalRole } from '../../shared/model/additionalRole';
import { RoundLogicService } from '../../core/round-logic.service';
import { DataService } from '../../core/data.service';


@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  private numberOfPlayers: number = 0;
  private MAXPLAYERS = 16;
  private MAFIACOUNTS: Map<string, number>;
  private basicRoles: string [] = [];
  private additionalNeutralRoles: AdditionalRole[] = [];
  private additionalNegativeRoles: AdditionalRole[] = [];
  private isGameStarted: boolean;

  constructor(private roundLogicService: RoundLogicService, private dataService: DataService) {
    this.MAFIACOUNTS = dataService.loadMafiaCounts();
    this.isGameStarted = false;
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

  prepareRoles(additionalRoles: AdditionalRole[]){
    const mafia = this.computeMafiaMembers();

    if(mafia === undefined){
      alert("Mafia is undefined");
      return;
    }
    
    let citizens = this.getPlayersCount() - mafia;

    for (let i = 0; i < citizens ; i++){
      this.basicRoles.push("Citizen");
    }
    for(let i = 0; i < mafia ; i++){
      this.basicRoles.push("Mafia");
    }

    this.loadSelectedRoles(additionalRoles);
    this.fillRemainingAdditionalRoles(citizens, mafia);
  }

  drawRole(){
    const lenghtOfRoles = this.basicRoles.length;
     if(lenghtOfRoles > 0){
      const randomBasicRoleIndex = Math.floor(Math.random() * lenghtOfRoles);
      const randomNeutralRoleIndex = Math.floor(Math.random() * this.additionalNeutralRoles.length);
      const randomNegativeRoleIndex = Math.floor(Math.random() * this.additionalNegativeRoles.length);
      const basicRole = this.basicRoles.splice(randomBasicRoleIndex, 1)[0];
      const additionalRole = basicRole === "Mafia"? this.additionalNegativeRoles.splice(randomNegativeRoleIndex,1)[0] 
                                                  : this.additionalNeutralRoles.splice(randomNeutralRoleIndex, 1)[0]; 
      return new RoleAssignment(basicRole, additionalRole);
     } else {
      alert("No roles to draw");
      return
     }
  }

  includeAdditionalRoles(roles: string[]){
    
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

  loadAdditionalRoles(roles: AdditionalRole[]){
    // roles.forEach(role =>{
    //   if(role.isVillain){
    //     this.additionalNegativeRoles.push(role);
    //   } else {
    //     this.additionalNeutralRoles.push(role);
    //   }
    // })
  }

  private loadSelectedRoles(additionalRoles: AdditionalRole[]){
    additionalRoles.forEach(additionalRole => {
      if(additionalRole.isVillain){
        this.additionalNegativeRoles.push(additionalRole);
      } else {
        this.additionalNeutralRoles.push(additionalRole);
      }
    })
  }
  
  start(){
    this.isGameStarted = true;
  }
  getGameState(){
    return this.isGameStarted;
  }
  private fillRemainingAdditionalRoles(numberOfCitizens: number, numberOfVillains: number){
    while(numberOfCitizens > this.additionalNeutralRoles.length){
      this.additionalNeutralRoles.push(new AdditionalRole(0, undefined, false));
    }
    while(numberOfVillains > this.additionalNegativeRoles.length){
      this.additionalNegativeRoles.push(new AdditionalRole(0, undefined, true));
    }
  }
}
