import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the Router service to navigate
  const _Router = inject(Router);

  // Ensure the code is running in a browser environment
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    // Check if the user token exists in localStorage
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      return true; // Allow navigation
    } else {
      // Redirect to login page
      _Router.navigate(['/auth/login']);
      return false; // Prevent navigation
    }
  } else {
    // Optionally redirect to login if localStorage is unavailable
    _Router.navigate(['/auth/login']);
    return false;
  }
};
