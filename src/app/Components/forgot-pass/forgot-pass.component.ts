import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  // Variable to store the user's email address
  email: any = ''


  constructor(private _AuthService: AuthService, private _Router: Router,private _ToastrService:ToastrService) {}

  // Method to handle the password reset request
  forgetPass() {
    // Check if the email is provided
    if (this.email) {
      // Call the forgetPass method from AuthService to initiate the password reset process
      this._AuthService.forgetPass(this.email).subscribe({
        next: (response) => {
          console.log(response);

          // Update the currentEmail observable with the provided email
          this._AuthService.currentEmail.next(this.email)

          // Check if the response contains a status message indicating success
          if (response.statusMsg) {

            // Navigate to the reset password page if successful
            this._Router.navigate(['/resetpass'])
          }
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error("Failed to send reset code. Please check your email and try again.");

        },complete:()=>{
          this._ToastrService.info("Reset code sent to your email")
        }
      })
    }
  }
}
