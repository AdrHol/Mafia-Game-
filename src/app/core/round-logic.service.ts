import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AdditionalRole } from '../shared/model/additionalRole';
import { Message } from '../shared/model/Message';
import { PlayerDataService } from './player-data.service';
import { MessagesContainer } from '../shared/model/messagesContainer';

@Injectable({
  providedIn: 'root'
})
export class RoundLogicService {
      private roundOrder: Map<string, AdditionalRole[]>;
      private NIGHT = 'night';
      private DAY = 'day';
      private EVERYONE = 'ALL';
      private MAFIA = 'MAF';
      private ERROR = new Message('Error');
      private messages: Map<string, Message>;
      private roundQueue: Message[] = [];

  constructor(private dataService: DataService, private playersService: PlayerDataService) {
    this.messages = dataService.fetchGameMessages();
    this.roundOrder = new Map();
   }

  startRound(){
    this.prepareOrder(this.playersService.getAdditionalRolesList());
  }

  getMessage(){
    if(this.roundQueue.length > 0){
      return this.roundQueue.shift();
    } else {
      return undefined;
    }
  }
  
  checkWinningCondition(){
    return this.checkCitizenWin() || this.checkMafiaWin();
  }
  getGameResult(){
    if (this.checkCitizenWin()){
      alert('MIESZKAŃCY WYGRALI');
    } else {
      alert('MAFIA WYGRAŁA');
    }
  }
  private prepareOrder(rolesList: AdditionalRole[]){
    const nightRoles = rolesList.filter(role => role.isWakingAtNight());
    this.roundOrder.set(this.NIGHT, nightRoles);
    const nightMessages = nightRoles.filter(role => role.displayValue !== undefined)
                                    .map(role => new Message(role.displayValue as string));
    this.roundQueue.push(this.messages.get(this.EVERYONE) || this.ERROR);
    this.roundQueue.push(this.messages.get(this.MAFIA) || this.ERROR);
    nightMessages.forEach(message => this.roundQueue.push(message));
  }
  private checkCitizenWin(){
    return this.playersService.getCountOfActiveMafia() === 0 && this.playersService.getCountOfActiveCitizens() > 0;
  }
  private checkMafiaWin(){
    return this.playersService.getCountOfActiveMafia() >= this.playersService.getCountOfActiveCitizens();
  }
}
