import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../../shared/model/player';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {

  @Input()
  playerData!: Player; 

  @Output()
  playerSelected: EventEmitter<PlayerCardComponent> = new EventEmitter<PlayerCardComponent>();

  selectCard(){
    this.playerSelected.emit(this);
  }
}
