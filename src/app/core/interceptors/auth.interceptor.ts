import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../features/users/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.accessToken;


  const authReq = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true
  });

  return next(authReq);
};