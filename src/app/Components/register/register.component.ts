import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  apiError:string=''
  isLoading:boolean=false

  
  constructor(private _AuthService:AuthService,private _Router:Router){}

  // Define the reactive form with validation rules
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })


  // Handle the form submission
  handleRegister(registerForm:FormGroup){
    // Show loading indicator
    this.isLoading=true

    // Check if form is valid
    if(registerForm.valid){
      this._AuthService.register(registerForm.value).subscribe({
        next:(response)=>{
          // Check if registration was successful
          if(response.message==="success"){
            // Hide loading indicator
            this.isLoading=false

            // Redirect to login page
            this._Router.navigate(['/login'])
          }
        },
        error:(err)=>{      
          // Hide loading indicator    
          this.isLoading=false

          // Set API error message
          this.apiError=err.error.message
        }
      })
    }
  }

}
