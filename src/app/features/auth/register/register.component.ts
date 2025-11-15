import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RegisterRequest } from '../../../core/models/register.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading = false; // Flag to show loading state during registration
  apiError = ''; // Variable to store any API error message
  registerForm: FormGroup; // FormGroup to handle the registration form

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {

    // Initialize the registerForm with validation rules
    this.registerForm = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]],
      rePassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to check password and confirm password match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('rePassword')?.value ? null : { mismatch: true };
  }

  // Submit handler for the registration form
  onSubmit(registerForm: FormGroup): void {
    // Check if the form is valid
    if (registerForm.valid) {
      this.isLoading = true; // Set loading state to true
      const waitingToast = this._ToastrService.info('Waiting...', '', { timeOut: 0 });

      // Call the AuthService to register the user
      this._AuthService.register(registerForm.value as RegisterRequest).subscribe({
        next: (response) => {
          this._ToastrService.clear(waitingToast.toastId);

          // If registration is successful, show success toast and navigate to login page
          if (response.message === 'success') {
            this.isLoading = false;
            this._ToastrService.success('Registration successful! Welcome to FreshCart. Please Login');
            this._Router.navigate(['auth/login']);
          }
        },
        error: (err) => {
          this.isLoading = false; // Set loading state to false
          this.apiError = err.error.message; // Store the error message
          this._ToastrService.clear(waitingToast.toastId);
          this._ToastrService.error(this.apiError);
          registerForm.reset();
        }
      });
    } else {
      this._ToastrService.error('Please fill all required fields correctly.');
    }
  }
}
