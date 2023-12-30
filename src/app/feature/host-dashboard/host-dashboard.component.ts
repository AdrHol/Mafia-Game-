import { AfterViewInit, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PlayerCardComponent } from './player-card/player-card.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { Player } from '../../shared/model/player';
import { NgIf } from '@angular/common';

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

  addPlayer(name: string){
    const playerDa: Player = {id: 1, name: name};
    const component = this.playerContainer.createComponent(PlayerCardComponent);
    const componentInstance = component.instance;
    componentInstance.playerData =  playerDa;
    this.playerComponentsRefs.push(component);
    componentInstance.playerSelected.subscribe(($event)=>{
      this.receiveSelectedPlayer($event);
    });
    this.fullNameInput.nativeElement.value = '';
    console.log(this.fullNameInput);
    return false;
    }
    removePlayer(){
      this.playerComponentsRefs.forEach(reference => {
        if(reference.instance === this.selectedPlayerComponent){
          reference.destroy();
          this.selectedPlayerComponent = undefined;
          const index = this.playerComponentsRefs.indexOf(reference)
          this.playerComponentsRefs.splice(index,1);
          console.log(this.playerComponentsRefs);
        }
      });
    }

    receiveSelectedPlayer(playerCard: PlayerCardComponent){
      this.selectedPlayerComponent = playerCard;
      console.log(playerCard);
    }
    isPlayerSelected(){
      return this.selectedPlayerComponent != undefined;
    }
}
 