import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RoleServiceService } from './shared/role-page/role-service.service';
import { GameLogicService } from './feature/host-dashboard/game-logic.service';

export const appConfig: ApplicationConfig = {
  providers: [RoleServiceService, 
              GameLogicService,
              provideRouter(routes)]
};
