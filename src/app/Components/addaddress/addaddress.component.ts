import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.css']
})
export class AddaddressComponent implements OnInit{

  
  // Array to hold user address data
  userAddressData:any[]=[]

  // Form group to handle user address form inputs
  userAddress:FormGroup=new FormGroup({
    name:new FormControl(null),
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })

  // Injecting UserService to interact with the backend
  constructor(private _UserService:UserService,private _ToastrService:ToastrService){}

  // Lifecycle hook to initialize component and fetch logged-in user address
  ngOnInit(): void {
    this.getLoggedUserAddress()
  }

  // Method to fetch logged-in user's address from the backend
  getLoggedUserAddress(){
    this._UserService.getLoggedUserAddress().subscribe({
      next:(response)=>{
        // Assign fetched address data to the component property
        this.userAddressData=response.data
      },
      error:(err)=>{
      }
    })
  }

  // Method to add a new user address
  addUserAddress(userAddress:FormGroup){
    this._UserService.addUserAddress(userAddress.value).subscribe({
      next:(response)=>{
        // Update address data and reset the form on success
        this.userAddressData=response.data

        this._ToastrService.info("Address added Successfully")

        // Clear the form inputs to prepare for new address entry
        this.clearInput()
      },
      error:(err)=>{
        
      }
    })
  }

  // Method to reset the form inputs
  clearInput(){
    this.userAddress.reset()
  }

}
