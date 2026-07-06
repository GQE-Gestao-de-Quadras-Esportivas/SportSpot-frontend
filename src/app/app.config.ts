import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiBaseInterceptor } from './core/interceptors/api-base-interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        apiBaseInterceptor,
        authInterceptor
      ])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
