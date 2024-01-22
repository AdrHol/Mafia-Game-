import {ComponentRef} from '@angular/core';
import { PlayerCardComponent } from '../../feature/host-dashboard/player-card/player-card.component';
import { PlayerDisplayValues } from './playerDisplayValues';

export class Player {
    id: number;
    name: string;
    status: string;
    role: string | undefined;
    additionalRole: string | undefined;
    playerComponent: ComponentRef<PlayerCardComponent>;

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
    }
    getPlayerData(): PlayerDisplayValues{
        return {'id' : this.id,
                'name' : this.name,
                'role' : this.role,
                'status' : this.status,
                'additionalRole': this.additionalRole};
    }
}