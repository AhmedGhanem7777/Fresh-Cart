import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../core/services/user/user.service';
import { IApiResponse, IUserAddress } from '../../../../core/models/user.interface';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss'
})
export class AddAddressComponent {
  // Array to hold user address data
  userAddressData: IUserAddress[] = []

  // Form group to handle user address form inputs
  userAddress: FormGroup = new FormGroup({
    name: new FormControl(null),
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })

  constructor(private _UserService: UserService) { }

  ngOnInit(): void {
    this.getLoggedUserAddress() // Fetch logged-in user address      
  }

  // Method to fetch logged-in user's address from the backend
  getLoggedUserAddress() {
    this._UserService.getLoggedUserAddress().subscribe({
      next: (response: IApiResponse) => {
        // Assign fetched address data to the component property
        this.userAddressData = response.data
      },
      error: (err) => {
      }
    })
  }

  // Method to add a new user address
  addUserAddress(userAddress: FormGroup) {
    this._UserService.addUserAddress(userAddress.value).subscribe({
      next: (response: IApiResponse) => {
        // Update address data and reset the form on success
        this.userAddressData = response.data

        // Clear the form inputs to prepare for new address entry
        this.clearInput()
      },
      error: (err) => {
      }
    })
  }

  // Method to reset the form inputs
  clearInput() {
    this.userAddress.reset()
  }
}
