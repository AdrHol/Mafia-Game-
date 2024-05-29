import { Injectable } from '@angular/core';
import { RoleAssignment } from '../../shared/model/roleAssignment';
import { AdditionalRole } from '../../shared/model/additionalRole';
import { RoundLogicService } from '../../core/round-logic.service';
import { DataService } from '../../core/data.service';
import { Message } from '../../shared/model/Message';
import { PlayerDataService } from '../../core/player-data.service';


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
  private finalRoles: RoleAssignment[] = [];
  private isGameStarted: boolean;
  private message: Message | undefined;

  constructor(private roundLogicService: RoundLogicService,
              private dataService: DataService,
              private playersData: PlayerDataService) {
    this.MAFIACOUNTS = dataService.loadMafiaCounts();
    this.isGameStarted = false;
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
    
    let citizens = this.playersData.getNumberOfPlayers() - mafia;
    console.log(mafia);
    console.log(citizens);
    for (let i = 0; i < citizens ; i++){
      this.basicRoles.push("Citizen");
    }
    for(let i = 0; i < mafia ; i++){
      this.basicRoles.push("Mafia");
    }

    this.loadSelectedRoles(additionalRoles);
    this.fillRemainingAdditionalRoles(citizens, mafia);
  }

  drawRole(additionalRoles: AdditionalRole[]){
    this.prepareRoles(additionalRoles);

     while(this.basicRoles.length > 0){
      const randomBasicRoleIndex = Math.floor(Math.random() * this.basicRoles.length);
      const randomNeutralRoleIndex = Math.floor(Math.random() * this.additionalNeutralRoles.length);
      const randomNegativeRoleIndex = Math.floor(Math.random() * this.additionalNegativeRoles.length);
      const basicRole = this.basicRoles.splice(randomBasicRoleIndex, 1)[0];
      const additionalRole = basicRole === "Mafia"? this.additionalNegativeRoles.splice(randomNegativeRoleIndex,1)[0] 
                                                  : this.additionalNeutralRoles.splice(randomNeutralRoleIndex, 1)[0];
      // const roleAssignment = new RoleAssignment(basicRole, additionalRole);
      const roleAssignment = {basicRole, additionalRole};
      this.finalRoles.push(roleAssignment);
     }
     this.playersData.assignRoles(this.finalRoles);
  }

  private computeMafiaMembers(){
    const memebers = this.playersData.getNumberOfPlayers();
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
    if(this.startGameConditionCheck()){
      this.isGameStarted = true;
      this.roundLogicService.startRound();
    }
  }

  getGameState(){
    return this.isGameStarted;
  }

  getNextMessage(){
    if(this.message === undefined){
      const nextMessage = this.roundLogicService.getMessage();
      if(nextMessage !== undefined){
        this.message = nextMessage
        return this.message.getDisplayedWakeMessage() || 'No message';
      }else {
        this.roundLogicService.checkWinningCondition() ? this.roundLogicService.getGameResult() : this.roundLogicService.startRound(); 
        return "End of round. Next round begins";
      }
    } else {
      const message = this.message?.getDisplayedSleepMessage() || "No more messages";
      this.message = undefined;
      return message;
    }
  }

  private fillRemainingAdditionalRoles(numberOfCitizens: number, numberOfVillains: number){
    while(numberOfCitizens > this.additionalNeutralRoles.length){
      this.additionalNeutralRoles.push(new AdditionalRole(0, undefined, false, false));
    }
    while(numberOfVillains > this.additionalNegativeRoles.length){
      this.additionalNegativeRoles.push(new AdditionalRole(0, undefined, true, false));
    }
  }
  private startGameConditionCheck(){
    return this.numberOfPlayersCheck();
  }
  private numberOfPlayersCheck(){
    if(this.numberOfPlayers < 3){
      alert("Not enough players");
      return false;
    } else {
      return true;
    }
  }
  
}
