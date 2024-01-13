import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RoundLogicService {
      // private roundOrder: Map<string, AdditionalRole[]>;
      // private winningConditionChecker: ConditionChecker;
      private messages: Object; 

  constructor(private dataService: DataService) {
    this.messages = dataService.fetchGameMessages();
   }

  startGame(){
    this.prepareOrder();

    // while(!this.winningConditionChecker.checkWin()){
    //     this.playRound();
    // }

  }

  private playRound(){
      
  }
  private prepareOrder(){

  }
}
