import { Routes } from '@angular/router';
import { StartPageComponent } from './core/start-page/start-page.component';
import { HostDashboardComponent } from './feature/host-dashboard/host-dashboard.component';
import { NewRoomComponent } from './feature/new-room/new-room.component';
import { PlayerViewComponent } from './feature/player-view/player-view.component';
import { RolePageComponent } from './shared/role-page/role-page.component';

export const routes: Routes = [
    {path:'host/:roomid', component:HostDashboardComponent},
    {path:'offline', component: HostDashboardComponent},
    {path:'online', component: NewRoomComponent},
    {path:'join', component: PlayerViewComponent},
    {path:'role', component: RolePageComponent},
    {path:'', component: StartPageComponent},
    {path: "**", redirectTo:'', pathMatch: 'full'}];
