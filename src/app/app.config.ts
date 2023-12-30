import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RoleServiceService } from './shared/role-page/role-service.service';

export const appConfig: ApplicationConfig = {
  providers: [RoleServiceService,
              provideRouter(routes)]
};
