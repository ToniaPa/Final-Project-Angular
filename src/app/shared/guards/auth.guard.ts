import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

//χρησιμοποιούμε το userService για να δούμε αν κάποιος είναι logged in
const userService = inject(UserService); 
const router = inject(Router); 

if (userService.user()) { //= getter του signal 
  return true; //= επιτρέπει την πρόσβαση
}

return router.navigate(['login']); //= δεν επιτρέπει την πρόσβαση -> redirect στο 'login' το οποίο στο app.routes.ts είναι:  path: 'login'
};
