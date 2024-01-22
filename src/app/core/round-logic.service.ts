import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AdditionalRole } from '../shared/model/additionalRole';
import { Message } from '../shared/model/Message';

@Injectable({
  providedIn: 'root'
})
export class RoundLogicService {
      private roundOrder: Map<string, AdditionalRole[]>;
      private NIGHT = 'night';
      private DAY = 'day';
      // private winningConditionChecker: ConditionChecker;
      private messages: Object;
      private roundQueue: Message[] = [];

  constructor(private dataService: DataService) {
    this.messages = dataService.fetchGameMessages();
    this.roundOrder = new Map();
   }

  startGame(rolesList: AdditionalRole[]){
    this.prepareOrder(rolesList);
    console.log(this.roundQueue);
    // while(!this.winningConditionChecker.checkWin()){
    //     this.playRound();
    // }
    // this.winningConditionChecker.getResult();
  }
  getMessage(){
    if(this.roundQueue.length > 0){
      return this.roundQueue.shift();
    } else {
      return undefined;
    }
  }
  private playRound(){

  }
  private prepareOrder(rolesList: AdditionalRole[]){
    const nightRoles = rolesList.filter(role => role.isWakingAtNight());
    this.roundOrder.set(this.NIGHT, nightRoles);
    const nightMessages = nightRoles.filter(role => role.displayValue !== undefined)
                                    .map(role => new Message(role.displayValue as string));
    this.roundQueue.push(new Message('Wszyscy'));
    this.roundQueue.push(new Message('Maifa'));
    nightMessages.forEach(message => this.roundQueue.push(message));
    this.roundQueue.push(new Message('Wszyscy'));
  }
}
