import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrl: './new-pass.component.scss'
})
export class NewPassComponent implements OnInit {
  passwordForm: FormGroup; // FormGroup to manage the password reset form
  isLoading = false; // Loading state for submitting the form
  errorMessage = ''; // Variable to store error messages
  email = ''; // Variable to store the email address for password reset

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {
    // Initialize the form with validation for password and confirm password fields
    this.passwordForm = this._FormBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^[A-Z][a-z0-9]{7,15}$/)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    // On initialization, retrieve the email for password reset
    this._AuthService.currentEmail.subscribe({
      next: (email) => {
        if (!email) {
          // If no email is found, navigate to the forgot password page
          this._Router.navigate(['/auth/forgot-pass']);
          return;
        }
        this.email = email; // Set the email for reset password
      },
      error: () => {
        // In case of an error retrieving the email, navigate to the forgot password page
        this._Router.navigate(['/auth/forgot-pass']);
      }
    });
  }

  // Custom validator to check if the password and confirm password match
  private passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    // If confirmPassword is not filled, no need to validate yet
    if (!confirmPassword) {
      return null;
    }

    // Return an error if passwords do not match
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Submit handler for the form
  onSubmit(): void {
    // If the form is invalid or passwords do not match, mark all fields as touched
    if (this.passwordForm.invalid || this.passwordForm.hasError('mismatch')) {
      Object.keys(this.passwordForm.controls).forEach((key) => {
        const control = this.passwordForm.get(key);
        if (control?.invalid) {
          control.markAsTouched(); // Mark invalid fields as touched
        }
      });
      return;
    }

    this.isLoading = true; // Start loading state
    this.errorMessage = ''; // Reset the error message

    // Call the AuthService to reset the password with the provided email and password
    this._AuthService
      .resetPassword(this.email, this.passwordForm.get('password')?.value)
      .pipe(finalize(() => (this.isLoading = false))) // Stop loading state once the request is completed
      .subscribe({
        next: (response) => {
          // If the response contains a token, store it in localStorage and navigate to login
          if (response.token) {
            localStorage.setItem('userToken', response.token);
            this._ToastrService.success('Password has been reset successfully.');
            this._Router.navigate(['/auth/login']);
          }
        },
        error: (error) => {
          // If an error occurs, display an error message
          this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
          this._ToastrService.error(this.errorMessage);
        }
      });
  }

  // Method to get error messages for form fields
  getErrorMessage(controlName: string): string {
    const control = this.passwordForm.get(controlName);

    // Check for specific validation errors and return corresponding messages
    if (control?.errors) {
      if (control.errors['required']) {
        return `${controlName === 'password' ? 'Password' : 'Confirm password'} is required.`;
      }
      if (control.errors['minlength']) {
        return 'Password must be at least 8 characters long.';
      }
      if (control.errors['pattern']) {
        return 'Password must start with an uppercase letter and include 8-16 alphanumeric characters.';
      }
    }

    // Return mismatch error for confirmPassword field
    if (this.passwordForm.hasError('mismatch') && controlName === 'confirmPassword') {
      return 'Passwords do not match.';
    }
    return '';
  }
}
