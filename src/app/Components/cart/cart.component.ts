import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/Services/cart.service';
import { GoBackService } from 'src/app/Services/go-back.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // Holds the details of the cart
  cartDetails: any = {};

  // Constructor to inject services
  constructor(private _CartService: CartService, private _GoBackService: GoBackService) {}

  // Lifecycle hook that is called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    this.getLoggedUserData()
  }

  // Fetches the logged-in user's cart data
  getLoggedUserData() {
    this._CartService.getLoggedUserData().subscribe({
      next: (response) => {
        // Update cartDetails with the response data
        this.cartDetails = response.data;
        console.log('Cart Details', response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  // Removes an item from the cart based on the product ID
  removeItem(productId: string) {
    this._CartService.removeCartItem(productId).subscribe({
      next: (response) => {
        console.log('remove Item In Cart', response)
        this.cartDetails = response.data

        // Update the number of items in the cart
        this._CartService.numOfCartItem.next(response.numOfCartItems)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  // Updates the count of a specific item in the cart
  updateItemCount(productId: string, count: number) {
    if (count === 0) {
      // Remove the item if count is zero
      this.removeItem(productId)
    } else {
      // If count is not zero, update the item count in the cart
      this._CartService.updateItemCount(productId, count).subscribe({
        next: (response) => {
          console.log(response)
          // Update the cart details with the new data
          this.cartDetails = response.data
        },
        error: (err) => {
          console.log(err);

        }
      })
    }
  }

  // Clears all items from the cart
  onClearCart() {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message === 'success') {
          // Clear cart details and update the number of items
          console.log(response)
          this.cartDetails = { products: [] } = { products: [] }
          this._CartService.numOfCartItem.next(0)
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  // Calculates the total price for a single product based on its price and count
  getPriceForOneProduct(price: number, count: number) {
    return price * count
  }


  // Navigates back to the previous page
  goBack() {
    this._GoBackService.goBack()
  }



}

