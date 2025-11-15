import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/models/login.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false; // Variable to manage loading state during the login process
  apiError: string = ''; // Variable to store error messages from the API response
  name?: string = '' // Variable to store the user's name after login

  // Form group with email and password fields, including validation rules
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)])
  });

  constructor(private _Router: Router, private _AuthService: AuthService, private _ToastrService: ToastrService) { }

  // Method to handle form submission for logging in
  onSubmit(loginForm: FormGroup): void {
    if (loginForm.valid) {
      const waitingToast = this._ToastrService.info("Waiting...", "", { timeOut: 0, extendedTimeOut: 0 });

      this.isLoading = true; // Set loading state to true while the request is in progress

      // Make an HTTP call to the login method in AuthService with form data
      this._AuthService.login(loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          this.isLoading = false; // Set loading state to false after response

          // If the response is successful, store the user token and decode user data
          if (response.message === 'success') {
            localStorage.setItem('userToken', response.token); // Store the token in localStorage
            this._AuthService.decodeUserData(); // Decode user data and store it in the service

            // Get the user's name from the AuthService and display a welcome message
            this._AuthService.userData.subscribe({
              next: (name) => {
                this.name = name?.name
              }
            })

            // After a brief delay, clear the waiting toast and show a success message
            setTimeout(() => {
              this._ToastrService.clear(waitingToast.toastId);
              this._ToastrService.success(`Welcome Back ${this.name}`);
              this._Router.navigate(['public/home']);
            }, 500);
          }
        },
        error: (err) => {
          this.isLoading = false; // Set loading state to false
          this.apiError = err.error.message; // Store the error message for display

          // After a brief delay, clear the waiting toast and show an error message
          setTimeout(() => {
            this._ToastrService.clear(waitingToast.toastId);
            this._ToastrService.error("Login Failed");
          }, 500);
        },
        complete: () => { this.isLoading = false; }
      });
    } else {
      this._ToastrService.warning("Please fill in the form correctly");
    }
  }
}
