import { Component } from '@angular/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ShippingAddress, CheckoutResponse } from '../../../../core/models/checkout.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  // Define the form group for shipping address
  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })

  cartId: string = ''; // To store the cart ID
  totalPrice: number = 0; // To store the total price of the cart

  constructor(private _CartService: CartService, private _Router: Router) { }

  ngOnInit(): void {
    // Fetch cart details when the component initializes
      this.getLoggedUserData()
  }

  // Fetch the logged user's cart details, including cart ID and total price
  getLoggedUserData() {
    this._CartService.getLoggedUserData().subscribe({
      next: (response: any) => {
        this.cartId = response.data._id; // Assign cart ID to the component property
        this.totalPrice = response.data.totalCartPrice; // Assign total cart price to the component property        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Handle online payment
  handlePayOnline(shippingAddressForm: FormGroup, cartId: string) {
    // Extract shipping address from the form
    const shippingAddress: ShippingAddress = shippingAddressForm.value;
    this._CartService.onlinePayment(shippingAddress, cartId).subscribe({
      next: (response: CheckoutResponse) => {
        if (response.session?.url) {
          // Navigate to the payment session URL
          this.navigateToPage(response.session.url);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Handle cash payment
  handleCash(shippingAddressForm: FormGroup, cartId: string) {
    // Extract shipping address from the form
    const shippingAddress: ShippingAddress = shippingAddressForm.value; 
    this._CartService.cashPayment(shippingAddress, cartId).subscribe({
      next: (response: CheckoutResponse) => {
        if (response.status === 'success') {
          this._Router.navigate(['/allorders']); // Navigate to the orders page
          this._CartService.numOfCartItem.next(0) // Reset the number of cart items
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Navigate to the provided URL (used for online payment)
  navigateToPage(url: string) {
    window.location.href = url;
  }
}
