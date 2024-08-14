import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // Inject the Router service to navigate
  const _Router =inject(Router)

  // Check if the user token exists in localStorage
  if(localStorage.getItem('userToken')!==null)
    {
      return true; // Allow navigation
    }
    else{
      // Redirect to login page
      _Router.navigate(['/login'])

      // Prevent navigation
      return false
    }
};
