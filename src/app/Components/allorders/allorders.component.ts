import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/Services/auth.service';
import { GoBackService } from 'src/app/Services/go-back.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{
  allOrders:any[]=[] // Array to hold all orders data
  userAllOrders:any[]=[] // Array to hold specific user's orders data
  userId:any='' // Variable to store the user ID
  decodeduserToken:any // Variable to store the decoded JWT token

  constructor(private _OrdersService:OrdersService,private _AuthService:AuthService,private _ProductService:ProductService,private _GoBackService:GoBackService){}

  // Lifecycle hook to initialize component and fetch user orders
  ngOnInit(): void {
    // Decode user token to get user ID
    this.decodeUserData()

    // If user ID is available, fetch the user's orders
    if (this.userId) {
      this.getUserOrders(this.userId)
    }
  }


  // Method to fetch orders for a specific user
  getUserOrders(userId:any){
        this._OrdersService.getUserOrders(userId).subscribe({
          next:(response)=>{
            // Assign the response data (user's orders) to the userAllOrders property
            this.userAllOrders=response

            console.log('all order',response);
            
          },
          error:(err)=>{
          }
        })
  }


  // Method to decode user token and extract user ID
  decodeUserData(): void {
    // Decode the JWT token using AuthService
    this.decodeduserToken=this._AuthService.decodeUserData()

    // Extract user ID from the decoded token
    this.userId=this.decodeduserToken.id
  }


  // Method to handle the go back action
  goBack(){
    // Call goBack method from GoBackService
    this._GoBackService.goBack()
  }


}

