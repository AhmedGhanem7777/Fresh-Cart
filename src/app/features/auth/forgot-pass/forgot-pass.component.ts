import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent {
  // Variable to manage loading state
  isLoading = false;

  // Variable to store error messages from API
  apiError = '';

  // Form group with email field, including validation rules
  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService,
  ) { }

  // Method to handle form submission
  onSubmit(): void {
    // Check if the form is valid before proceeding
    if (this.forgotForm.valid) {
      this.isLoading = true; // Set loading to true when submitting
      const email = this.forgotForm.get('email')!.value; // Get the email value from the form

      if (email) {
        const waitingToast = this._ToastrService.info('Waiting...', '', { timeOut: 5000 });

        // Call the forgotPassword method of AuthService to initiate password reset
        this._AuthService.forgotPassword(email).subscribe({
          next: (response) => {
            // Clear the waiting toast message
            this._ToastrService.clear(waitingToast.toastId);
            if (response.statusMsg) {
              // If successful, update current email in AuthService and navigate to the verification page
              this._AuthService.currentEmail.next(email);
              this._Router.navigate(['auth/verify-email']);
              this._ToastrService.success('Reset code sent to your email');
            }
            this.isLoading = false; // Set loading to false after request completion
          },
          error: (err) => {
            this.isLoading = false;
            this.apiError = err.error.message;
            this._ToastrService.clear(waitingToast.toastId);
            this._ToastrService.error(this.apiError, 'Error');
          }
        });
      } else {
        this._ToastrService.error('Please enter a valid email address');
      }
    }
  }
}
