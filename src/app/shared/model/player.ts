import {ComponentRef, EventEmitter} from '@angular/core';
import { PlayerCardComponent } from '../../feature/host-dashboard/player-card/player-card.component';
import { PlayerDisplayValues } from './playerDisplayValues';
import { Subscription } from 'rxjs';

export class Player {
    id: number;
    name: string;
    status: string;
    role: string | undefined;
    additionalRole: string | undefined;
    playerComponent: ComponentRef<PlayerCardComponent>;
    stateEvent: Subscription;

    constructor(id: number,
                name: string,
                status: string,
                role: string | undefined,
                additionalRole: string | undefined,
                component: ComponentRef<PlayerCardComponent>){
        this.id = id;
        this.name = name;
        this.status = status;
        this.role = role;
        this.additionalRole = additionalRole;
        this.playerComponent = component;
        this.stateEvent = component.instance.playerEliminatedEvent.subscribe((e) => {
            this.playerStateChange(e);
        });
    }
    getPlayerData(): PlayerDisplayValues{
        return {'id' : this.id,
                'name' : this.name,
                'role' : this.role,
                'status' : this.status,
                'additionalRole': this.additionalRole};
    }
    playerStateChange(isEliminated: boolean){
        isEliminated ? this.status = 'Eliminated' : this.status = 'Alive';
    }
    updateComponent(){
        this.playerComponent.instance.playerData = this.getPlayerData();
    }
    unsubscribe(){
        this.stateEvent.unsubscribe();
    }
}