import {ComponentRef, EventEmitter} from '@angular/core';
import { PlayerCardComponent } from '../../feature/host-dashboard/player-card/player-card.component';
import { PlayerDisplayValues } from './playerDisplayValues';
import { Subscription } from 'rxjs';
import { RoleAssignment } from './roleAssignment';

export class Player {
    id: string;
    name: string;
    status: string;
    role: RoleAssignment | undefined;
    playerComponent: ComponentRef<PlayerCardComponent>;
    stateEvent: Subscription;

    constructor(id: string,
                name: string,
                status: string,
                role: RoleAssignment | undefined,
                component: ComponentRef<PlayerCardComponent>){
        this.id = id;
        this.name = name;
        this.status = status;
        this.role = role
        this.playerComponent = component;
        this.stateEvent = component.instance.playerEliminatedEvent.subscribe((e) => {
            this.playerStateChange(e);
        });
    }
    getPlayerData(): PlayerDisplayValues{
        return {'id' : this.id,
                'name' : this.name,
                'role' : this.role?.basicRole,
                'status' : this.status,
                'additionalRole': this.role?.additionalRole?.displayValue};
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