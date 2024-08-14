import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-create-new-pass',
  templateUrl: './create-new-pass.component.html',
  styleUrls: ['./create-new-pass.component.css']
})
export class CreateNewPassComponent implements OnInit {

  // Variables to store email and new password
  email: any = ''
  newPassword: any = ''


  constructor(private _AuthService: AuthService,private _ToastrService:ToastrService, private _Router: Router, private _UserService: UserService) {

  }

  ngOnInit(): void {
    // Fetch the current email when the component initializes
    this.getCurrentEmail()
  }


  // Fetches the current email from AuthService
  getCurrentEmail(){
    this._AuthService.currentEmail.subscribe({
      next: (response) => {
        console.log('current email', response);

        // Store the current email in the component
        this.email = response
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  // Saves the new password after verifying the email and password inputs
  saveNewPass(email: any, newPassword: any) {
    // Check if email and newPassword are not null
    if (email!==null&& newPassword !== null) {
      // Call the resetPass method from AuthService to reset the password
      this._AuthService.resetPass(email, newPassword).subscribe({
        next: (response) => {

          console.log('res from newPass',response);

          // Store the new user token in local storage
          localStorage.setItem('userToken', response.token)

          // Navigate to the home page after successful password reset
          this._Router.navigate(['/home'])
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error("Failed to reset password. Please try again.");
        },
        complete:()=>{
          this._ToastrService.info("Password changed successfully.");

        }
      })
    }
  }


}
