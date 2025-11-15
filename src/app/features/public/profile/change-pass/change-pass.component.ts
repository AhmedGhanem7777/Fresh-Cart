import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user/user.service';
import { IChangePassword, IApiResponse } from '../../../../core/models/user.interface';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent {
  emailError: string = '' // Variable to hold error message for email-related errors

  // Form group for password change inputs
  newPass: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null, [Validators.required])
  });

  constructor(private _UserService: UserService) { }

  // Function to handle password change
  changePass() {
    if (this.newPass.invalid) { // Check if the form is invalid
      return; // Exit the function if validation fails
    }

    // Check if the user is logged in by verifying the presence of the token
    if (localStorage.getItem('userToken')) {
      this._UserService.updateLoggedUserPass(this.newPass.value as IChangePassword).subscribe({
        next: (response: IApiResponse) => {
          if (response.message === "success") { // Check if the operation was successful
            if (response.data && response.data.token) { // Update the token in local storage if available
              localStorage.setItem('userToken', response.data.token);
            }
            this.newPass.reset(); // Reset the form after a successful operation
          }
        },
        error: (err) => {
          this.emailError = err.error.errors.msg // Update the error message to display to the user
        }
      });
    }
  }
}
