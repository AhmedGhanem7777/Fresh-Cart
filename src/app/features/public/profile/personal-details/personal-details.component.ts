import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserService } from '../../../../core/services/user/user.service';
import { IUser, IApiResponse } from '../../../../core/models/user.interface';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent implements OnInit {
  userId: string = ''; // Stores the logged-in user's ID
  personalDetailsForm!: FormGroup; // FormGroup for personal details form
  userProfileData: IUser | null = null; // Stores user profile data
  decodeduserToken: any; // Decoded JWT token
  emailError: string = ''; // Error message for email validation
  profileImage: string = '../../../../../assets/images/user-Csi4vjZh.png'; // Default profile image
  isLoading: boolean = false; // Loading state for image upload

  constructor(private _UserService: UserService, private fb: FormBuilder, private _AuthService: AuthService) {
    // Load saved image from localStorage if it exists
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profileImage = savedImage;
    }
  }

  ngOnInit(): void {
    // Initialize the personal details form with validators
    this.personalDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });

    // If a user token exists, decode it and fetch the user profile data
    this.decodedToken();
    this.getProfileDataById(this.userId);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;

      // Create a FileReader to read the selected file
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Save the actual image data to localStorage and display it
        localStorage.setItem('profileImage', e.target.result);
        this.profileImage = e.target.result;
        this.isLoading = false;
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  // Fetch user profile data using the UserService
  getProfileDataById(id: string) {
    this._UserService.getUserProfileDataById(id).subscribe({
      next: (response: IApiResponse) => {
        this.userProfileData = response.data; // Store the profile data
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateUserProfile(): void {
    // Check if form is valid
    if (this.personalDetailsForm.valid) {
      this._UserService.updateUserProfile(this.personalDetailsForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('data for updated', response);

            // Check if update was successful
            if (response.message === 'success') {
              this.getProfileDataById(this.userId) // Refresh profile data
              this.clearInputs(); // Clear form inputs
            }
          },
          error: (err) => {
            this.emailError = err.error.errors.msg // Display the error message
          }
        });
    }
  }

  clearInputs(): void {
    this.personalDetailsForm.reset(); // Reset the form fields
    this.emailError = ''; // Clear error message when form is reset
  }

  decodedToken(): void {
    const decodeduserToken = this._AuthService.decodeUserData(); // Decode the JWT token
    if (decodeduserToken) {
      if (decodeduserToken.id) {
        this.userId = decodeduserToken.id;
      } else {
        console.error('ID is missing in the decoded token');
      }
    } else {
      console.error('Failed to decode user token');
    }
  }
}
