import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {

  // Define the form group for changing password with three form controls and validators
  newPass: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null, [Validators.required])
  });

  constructor(private _UserService: UserService, private _ToastrService: ToastrService) {}

  // Method to handle the password change request
  changePass() {
    if (this.newPass.invalid) {
      this._ToastrService.warning("Please fill out all fields correctly", "Validation Error");
      return;
    }
  
    console.log(this.newPass.value); // Check if currentPassword is present
  
    if (this.newPass.value.password !== this.newPass.value.rePassword) {
      this._ToastrService.warning("Passwords do not match", "Validation Error");
      return;
    }
  
    
    if (localStorage.getItem('userToken')) {
      this._UserService.updateLoggedUserPass(this.newPass.value).subscribe({
        next: (response) => {
          console.log('update pass', response);
          if (response.message === "success") {
            localStorage.setItem('userToken', response.token);
            this._ToastrService.success("Password Changed Successfully");
            this.newPass.reset();
          }
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error("Failed to change password", "Error");
        }
      });
    }
  }
  
}
