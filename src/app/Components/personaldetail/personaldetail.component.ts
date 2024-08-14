import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-personaldetail',
  templateUrl: './personaldetail.component.html',
  styleUrls: ['./personaldetail.component.css']
})
export class PersonaldetailComponent implements OnInit{
  userId:any=''
  personalDetailsForm!: FormGroup;
  userProfileData:any
  decodeduserToken:any


  constructor(private _UserService:UserService,private fb:FormBuilder,private _AuthService:AuthService,private _ToastrService:ToastrService){}

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.personalDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    // Decode the JWT token to get user ID
    this.decodedToken()

    // Fetch user profile data based on user ID
    this.getProfileDataById(this.userId)

  }

  // Method to fetch profile data by user ID
  getProfileDataById(id:any){
    this._UserService.getUserProfileDataById(id).subscribe({
      next:(response)=>{
        console.log('Profile data',response.data);

        // Assign profile data to variable
        this.userProfileData=response.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  // Method to update user profile
  updateUserProfile(): void {
    // Check if form is valid
    if (this.personalDetailsForm.valid) {
      this._UserService.updateUserProfile(this.personalDetailsForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('data for updated',response);
            
            // Check if update was successful
            if (response.message === 'success') {
              this.getProfileDataById(this.userId) // Refresh profile data
              this.clearInputs(); // Clear form inputs
              this._ToastrService.info("Information's Changed Successfully")
            }
          },
          error: (err) => {
            console.log('E-mail already in use',err);
            this._ToastrService.error("E-mail already in use")
            
          }
        });
    }
  }


  // Method to clear form inputs
  clearInputs(): void {
    // Reset the form to its initial state
    this.personalDetailsForm.reset();
  }


  // Method to decode the JWT token and set user ID
  decodedToken(){
    this.decodeduserToken=this._AuthService.decodeUserData() // Decode the token using AuthService
    this.userId=this.decodeduserToken.id // Set user ID from decoded token
  }




}





















