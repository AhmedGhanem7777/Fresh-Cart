import { Component } from '@angular/core';
import { GoBackService } from '../../../../core/services/global/go-back.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { Cart, CartResponse } from '../../../../core/models/cart.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  // Initialize cartDetails with an empty products array and 0 totalCartPrice
  cartDetails: Cart = {
    products: [],
    totalCartPrice: 0
  };

  isLoading: boolean = true; // Flag to indicate loading state

  constructor(private _CartService: CartService, private _ToastrService: ToastrService, private _GoBackService: GoBackService) { }

  ngOnInit(): void {
    // Fetch logged user data when the component initializes
    if (typeof window !== 'undefined') {
      this.getLoggedUserData();
    }
  }

  // Method to fetch logged user data (cart details)
  getLoggedUserData(): void {
    this._CartService.getLoggedUserData().subscribe({
      next: (response: CartResponse) => {
        this.cartDetails = response.data;
        this.isLoading = false; // Set loading flag to false after data is fetched
      },
      error: (err) => {
        this.isLoading = false; // Set loading flag to false if an error occurs
      },
    });
  }

  // Method to remove an item from the cart by its product ID
  removeItem(productId: string): void {
    this._CartService.removeCartItem(productId).subscribe({
      next: (response: CartResponse) => {
        this.cartDetails = response.data; // Update cart details after removing item
        this._CartService.numOfCartItem.next(response.numOfCartItems); // Update cart item count
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Method to update the quantity of a cart item
  updateItemCount(productId: string, count: number): void {
    if (count === 0) {
      // If count is 0, delete the product from the cart
      const toast = this._ToastrService.info('Deleting your product...', '', { disableTimeOut: true });
      this.removeItem(productId);
      this._ToastrService.clear(toast.toastId);
      this._ToastrService.success('Product Removed successfully')
    } else {
      // If count is greater than 0, update the quantity of the product
      const toast = this._ToastrService.info('Waitng...', '', { disableTimeOut: true });
      this._CartService.updateItemCount(productId, count).subscribe({
        next: (response: CartResponse) => {
          this.cartDetails = response.data; // Update cart details after count change
          this._ToastrService.clear(toast.toastId);
          this._ToastrService.success(`You have ${count} pieces now`)
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  // Method to clear all items from the cart
  onClearCart() {
    this._CartService.clearCart().subscribe({
      next: (response: CartResponse) => {
        if (response.message === 'success') {
          this.cartDetails = { products: [], totalCartPrice: 0 } // Clear cart details
          this._CartService.numOfCartItem.next(0) // Set number of cart items to 0
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Helper method to calculate the price for a single product based on its price and quantity
  getPriceForOneProduct(price: number, count: number): number {
    return price * count;
  }

  // Method to navigate back using the GoBackService
  goBack(): void {
    this._GoBackService.goBack();
  }
}
