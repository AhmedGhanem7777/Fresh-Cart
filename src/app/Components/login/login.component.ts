import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  apiError:string='' // Variable to store API error messages
  isLoading:boolean=false // Variable to show loading spinner or indicator

  constructor(private _AuthService:AuthService,private _Router:Router,private _ToastrService:ToastrService){}

  // Define the form group for login with validation rules
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required]),
  })

  // Method to handle login form submission
  handleLogin(loginForm:FormGroup){
    // Set loading indicator to true while processing the login
    this.isLoading=true

    // Check if the form is valid
    if(loginForm.valid){
      // Call login method from AuthService with form values
      this._AuthService.login(loginForm.value).subscribe({
        next:(response)=>{
          // Check if the response indicates success
          if(response.message==="success"){
            localStorage.setItem('userToken',response.token) // Store the token in local storage
            this._AuthService.decodeUserData() // Decode user data from the token
            this.isLoading=false // Hide loading indicator
            this._ToastrService.info(`Welcome Back`)
            this._Router.navigate(['/home']) // Navigate to the home page
          }
        },
        error:(err)=>{          
          this.isLoading=false // Hide loading indicator
          this.apiError=err.error.message // Set error message for display
        }
      })
    }
  }

}
