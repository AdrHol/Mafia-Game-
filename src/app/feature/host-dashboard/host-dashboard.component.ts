import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PlayerCardComponent } from './player-card/player-card.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { AdditionalRolesComponent } from './additional-roles/additional-roles.component';
import { Player } from '../../shared/model/player';
import { NgClass, NgIf } from '@angular/common';
import { GameLogicService } from './game-logic.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { AdditionalRole } from '../../shared/model/additionalRole';
import { PlayerDataService } from '../../core/player-data.service';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [GameboardComponent, NgIf, AdditionalRolesComponent, NgClass],
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css'
})
export class HostDashboardComponent {

  @ViewChild(GameboardComponent, {read: ViewContainerRef})
  playerContainer!: ViewContainerRef;

  @ViewChild('playerName') 
  fullNameInput: any; 

  @ViewChild('additionalRoles')
  additionalRolesComponent: any;

  @ViewChild('startGameButton')
  startGameButton: any;

  additionalRolesList: AdditionalRole[];

  // playerComponentsRefs: ComponentRef<PlayerCardComponent>[] = [];

  selectedPlayerComponent!: PlayerCardComponent | undefined;

  displayedMessage: string = '';

  constructor(private gameLogicService: GameLogicService, 
              private dataService: DataService,
              private playersService: PlayerDataService,
              private route: ActivatedRoute,){
        this.additionalRolesList = dataService.fetchAdditionalRoles();
        this.gameLogicService.loadAdditionalRoles(this.additionalRolesList);
  }

  addPlayer(name: string){
    if(this.playersService.getNumberOfPlayers() < 16){
      console.log(this.route);
      const component = this.playerContainer.createComponent(PlayerCardComponent);
      // const playerEntity: Player = new Player (1, name, "alive", undefined, undefined, component);
      this.playersService.createPlayer(1, name, "alive", undefined, undefined, component);
      const componentInstance = component.instance;
      // componentInstance.playerData =  playerEntity;
      
      // this.playerComponentsRefs.push(component);

      componentInstance.playerSelected.subscribe(($event)=>{
        this.receiveSelectedPlayer($event);
      });

      this.fullNameInput.nativeElement.value = '';
      this.gameLogicService.addPlayer();
      console.log(this.gameLogicService.getPlayersCount());
      return false;
    } else {
      this.unsupportedPlayerCount();
      return false;
    }
    }

    removePlayer(){
      // this.playerComponentsRefs.forEach(reference => {
      //   if(reference.instance === this.selectedPlayerComponent){
      //     reference.destroy();
      //     this.selectedPlayerComponent = undefined;
      //     const index = this.playerComponentsRefs.indexOf(reference)
      //     this.playerComponentsRefs.splice(index,1);
      //     this.gameLogicService.removePlayer();
      //   }
      // });
    }

    receiveSelectedPlayer(playerCard: PlayerCardComponent){
      this.applySelectedPlayerStyle(playerCard);
      this.selectedPlayerComponent = playerCard;
    }
    
    drawRoles(){
      // this.gameLogicService.prepareRoles(this.additionalRolesComponent.getCheckedRoles());
      // this.playerComponentsRefs.forEach(player => {
      //   const role = this.gameLogicService.drawRole();
      //   if(role !== undefined){
      //     player.instance.applyRole(role);
      //   }
      // })
    }

    startGame(event: Event){
      this.gameLogicService.start();
    }

    unsupportedPlayerCount(){
      alert("Maximum number of players is 16");
    }

    private applySelectedPlayerStyle(playerCard: PlayerCardComponent){
      if(this.selectedPlayerComponent !== undefined){
        this.selectedPlayerComponent.removeStyle('selected');
      } 
      playerCard.applyStyle('selected');
    }

    expandAdditionalRoles(){
      this.additionalRolesComponent.switchVisibility();
    }
    checkGameState(){
      return !this.gameLogicService.getGameState();
    }
    getNextMessage(){
      this.displayedMessage = this.gameLogicService.getNextMessage();
    }
}
 