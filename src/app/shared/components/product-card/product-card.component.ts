import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;


  constructor(private _CartService: CartService, private _AuthService: AuthService, private _WishlistService: WishlistService, private _ToastrService: ToastrService) { }

  // Method to add a product to the wishlist
  addToFav(productId: any) {
    const toast = this._ToastrService.info('Adding your product to wishlist...', '', { disableTimeOut: true });

    // Call WishlistService to add the product to the wishlist
    this._WishlistService.addToWishList(productId).subscribe({
      next: (reponse) => {
        console.log('response for wishlist in home', reponse);

        // Updates the number of wishlist items by emitting the new count
        this._WishlistService.numOfWishItem.next(reponse.data.length)

        this._ToastrService.clear(toast.toastId);
        this._ToastrService.success('Product added to wishlist!');
      },
      error: (err) => {
        console.log(err);

        this._ToastrService.clear(toast.toastId);

        if (this._AuthService.isAuthenticated()) {
          this._ToastrService.error('Failed to add product to wishlist. Please Login')
        }
      }
    })
  }


  // Adds a product to the cart
  addToCart(productId: any) {
    const toast = this._ToastrService.info('Adding your product to cart...', '', { disableTimeOut: true });

    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log(response);

        // Updates the BehaviorSubject with the new number of items in the cart
        this._CartService.numOfCartItem.next(response.numOfCartItems)
        console.log(response.numOfCartItems);

        this._ToastrService.clear(toast.toastId);
        this._ToastrService.success('Product added to cart!')
      },
      error: (err) => {
        console.log(err);

        this._ToastrService.clear(toast.toastId);

        if (this._AuthService.isAuthenticated()) {
          this._ToastrService.error('Failed to add product to cart. Please Login')
        }
      }
    })
  }
}
