import { AfterViewInit, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PlayerCardComponent } from './player-card/player-card.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { Player } from '../../shared/model/player';
import { NgIf } from '@angular/common';
import { GameLogicService } from './game-logic.service';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [GameboardComponent, NgIf],
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css'
})
export class HostDashboardComponent {

  @ViewChild(GameboardComponent, {read: ViewContainerRef})
  playerContainer!: ViewContainerRef;
  
  @ViewChild('playerName') 
  fullNameInput: any; 

  playerComponentsRefs: ComponentRef<PlayerCardComponent>[] = [];

  selectedPlayerComponent!: PlayerCardComponent | undefined;

  constructor(private gameLogicService: GameLogicService){
  }

  addPlayer(name: string){
    if(this.playerComponentsRefs.length < 16){
    const playerDa: Player = {id: 1, name: name, status: "alive", role: undefined};
    const component = this.playerContainer.createComponent(PlayerCardComponent);
    const componentInstance = component.instance;
    componentInstance.playerData =  playerDa;
    this.playerComponentsRefs.push(component);
    componentInstance.playerSelected.subscribe(($event)=>{
      this.receiveSelectedPlayer($event);
    });
    this.fullNameInput.nativeElement.value = '';
    this.gameLogicService.addPlayer();
    console.log(this.gameLogicService.getPlayersCount());
    return false;
    }
    this.unsupportedPlayerCount();
    return false;
    }

    removePlayer(){
      this.playerComponentsRefs.forEach(reference => {
        if(reference.instance === this.selectedPlayerComponent){
          reference.destroy();
          this.selectedPlayerComponent = undefined;
          const index = this.playerComponentsRefs.indexOf(reference)
          this.playerComponentsRefs.splice(index,1);
          this.gameLogicService.removePlayer();
        }
      });
    }

    receiveSelectedPlayer(playerCard: PlayerCardComponent){
      this.selectedPlayerComponent = playerCard;
    }
    
    drawRoles(){
      this.gameLogicService.prepareRoles();

      this.playerComponentsRefs.forEach(player => {
        player.instance.playerData.role = this.gameLogicService.drawRole()?.basicRole;
      })
    }
    unsupportedPlayerCount(){
      alert("Maximum number of players is 16");
    }
}
 