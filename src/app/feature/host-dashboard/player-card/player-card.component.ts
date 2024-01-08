import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../../shared/model/player';
import { NgClass } from '@angular/common';
import { RoleAssignment } from '../../../shared/model/roleAssignment';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {

  @Input()
  playerData!: Player; 

  appliedStyle: String[] = ["player_card"]; 

  @Output()
  playerSelected: EventEmitter<PlayerCardComponent> = new EventEmitter<PlayerCardComponent>();

  selectCard(){
    this.playerSelected.emit(this);
  }
  playerEliminated(){
    if(this.playerData.status === 'alive'){
      this.playerData.status = 'eliminated';
      this.applyStyle('eliminated');
    }
  }
  playerRestored(){
    if(this.playerData.status === 'eliminated'){
      this.playerData.status = 'alive';
      this.removeStyle('eliminated');
    }
  }
  applyRole(role: RoleAssignment){
    const currentRole = this.playerData.role;
    if(currentRole !== undefined){
      this.removeStyle(currentRole);
    }
    this.playerData.role = role.basicRole;
    this.playerData.additionalRole = role.additionalRole;
    this.applyStyle(role.basicRole);
  }
  applyStyle(style: string){
    this.appliedStyle.push(style);
  }
  removeStyle(style: string){
    const index = this.appliedStyle.indexOf(style);
    if(index > -1){
      this.appliedStyle.splice(index,1);
    }
  }
}
