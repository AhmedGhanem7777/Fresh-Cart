import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {
  // Variable to store the reset code
  code:any=''

  constructor(private _AuthService:AuthService,private _Router:Router,private _ToastrService:ToastrService){}

  
  // Method to handle password reset
  resetPass(){
    // Check if the reset code is not null
    if(this.code !== null){
      this._AuthService.verifyResetCode(this.code).subscribe({
        next:(response)=>{
          console.log(response);
          // Check if the response status is 'Success'
          if(response.status==='Success'){

            // Redirect to create a new password page
            this._Router.navigate(['/createnewpass'])
          }else{
            this._ToastrService.warning("Invalid or expired reset code. Please try again.")
          }
        },
        error:(err)=>{
          console.log(err);
          this._ToastrService.error("Failed to verify the reset code. Please try again.");
          
        },complete:()=>{
          this._ToastrService.info("Code verification process completed.");

        }
      });
    }else{
      this._ToastrService.warning("Please enter the reset code.");
    }
  }
}
