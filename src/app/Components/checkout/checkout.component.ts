import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  // Define the form group for the shipping address with three form controls
  shippingAddressForm:FormGroup=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })

  // Holds the cart ID, total price, and any additional data related to the checkout
  cartId:any=''
  data:any=0
  totalPrice:any=0


  constructor(private _CartService:CartService,private _Router:Router){}


  ngOnInit(): void {
    // Fetch the logged-in user's cart data when the component initializes
    this.getLoggedUserData()
  }

  // Fetches the logged-in user's cart data from CartService
  getLoggedUserData(){
    this._CartService.getLoggedUserData().subscribe({
      next:(response)=>{
        console.log('cart id',response.data._id);

        // Store the cart ID in the component
        this.cartId=response.data._id

        // Store the total cart price in the component
        this.totalPrice=response.data.totalCartPrice
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  // Handles online payment by calling CartService and then navigating to the payment page
  handlePayOnline(shippingAddressForm:FormGroup,cartId:any){
    this._CartService.onlinePayment(shippingAddressForm.value,cartId).subscribe({
      next:(response)=>{
        console.log(response);
        // Redirect to the payment URL provided in the response
        this.navigateToPage(response.session.url)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  // Handles cash payment by calling CartService and then navigating to the orders page
  handleCash(shippingAddressForm:FormGroup,cartId:any){
    this._CartService.cashPayment(shippingAddressForm.value,cartId).subscribe({
      next:(response)=>{
        if(response.status==='success'){
          console.log(response);

          // Navigate to the orders page upon successful cash payment
          this._Router.navigate(['/allorders'])
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  // Navigates to a given URL
  navigateToPage(url:string){
    window.location.href=url
  }
}
