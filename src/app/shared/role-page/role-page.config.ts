import { ApplicationConfig } from '@angular/core';
import { provideRouter } from "@angular/router";
import { roleRoutes } from './role-page.routes';

export const rolePageConfig: ApplicationConfig = {
    providers: [provideRouter(roleRoutes)]
  };