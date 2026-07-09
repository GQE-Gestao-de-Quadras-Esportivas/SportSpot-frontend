import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../features/users/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.accessToken;
  const http = inject(HttpClient);


  const authReq = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true
  });

  if (req.url.includes('viacep.com.br')) {
    return next(req);
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/login') && !req.url.includes('auth/refresh')) {
        return http.post<{ accessToken: string }>('auth/refresh', {}, { withCredentials: true }).pipe(
          switchMap((response) => {
            userService.updateAccessToken(response.accessToken);

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` },
              withCredentials: true
            });

            return next(retryReq);
          }),
          catchError((refreshError) => {
            userService.logout();
            window.location.href = '/login';
            return throwError(() =>  refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};