import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RoleServiceService } from './shared/role-page/role-service.service';
import { GameLogicService } from './feature/host-dashboard/game-logic.service';
import { AdditionalRolesService } from './feature/host-dashboard/additional-roles/additional-roles.service';
import { DataService } from './core/data.service';
import { RoundLogicService } from './core/round-logic.service';
import { PlayerDataService } from './core/player-data.service';
import { HttpClientModule } from '@angular/common/http';
import { WebSocketService } from './core/web-socket.service';

export const appConfig: ApplicationConfig = {
  providers: [RoleServiceService, 
              GameLogicService,
              AdditionalRolesService,
              DataService,
              RoundLogicService,
              PlayerDataService,
              WebSocketService,
              importProvidersFrom(HttpClientModule),
              provideRouter(routes)]
};
