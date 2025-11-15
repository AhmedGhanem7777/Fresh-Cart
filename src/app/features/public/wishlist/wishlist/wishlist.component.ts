import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { GoBackService } from '../../../../core/services/global/go-back.service';
import { WishlistData } from '../../../../core/models/wishlist.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  allWishlist: WishlistData[] = []; // Array to hold all wishlist items
  isLoading: boolean = true; // Flag for loading state
  showConfirmDialog: boolean = false; // Flag to control confirmation dialog visibility
  pendingProductId: string | null = null; // Holds the ID of the product pending removal
  isRemoveAll: boolean = false; // Flag to indicate whether all items should be removed

  constructor(private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _GoBackService: GoBackService) {
    // Check if the user has a token in localStorage and fetch wishlist
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log('wish list', response);
        this.isLoading = false
        this._WishlistService.numOfWishItem.next(response.count) // Update wishlist count
      },
      error: (err) => {
        this.isLoading = false
      }
    })
  }

  ngOnInit(): void {
    // Fetch wishlist when component initializes
    this.getWishList()
  }

  // Close confirmation dialog if clicked outside modal
  onModalClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.handleCancel();
    }
  }

  // Prepare for removal of a single product
  confirmRemove(productId: string) {
    this.pendingProductId = productId;
    this.isRemoveAll = false;
    this.showConfirmDialog = true;
  }

  // Prepare for removal of all products
  confirmRemoveAll() {
    this.isRemoveAll = true;
    this.showConfirmDialog = true;
  }


  // Handle confirmation action
  handleConfirm() {
    if (this.isRemoveAll) {
      this.removeAllFav(); // Remove all products
    } else if (this.pendingProductId) {
      this.removeItem(this.pendingProductId); // Remove a single product
    }
    this.closeConfirmDialog(); // Close the confirmation dialog
  }


  // Handle cancel action for confirmation
  handleCancel() {
    // Close the dialog without performing any action
    this.closeConfirmDialog();
  }

  // Close the confirmation dialog and reset related flags
  closeConfirmDialog() {
    this.showConfirmDialog = false;
    this.pendingProductId = null;
    this.isRemoveAll = false;
  }

  // Fetch the wishlist data
  getWishList() {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        // Assign the wishlist data to the array
        this.allWishlist = response.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Remove a single item from the wishlist
  removeItem(productId: string) {
    this._WishlistService.removeWishItem(productId).subscribe({
      next: (response) => {
        this.allWishlist = response.data // Update wishlist after removal
        this.getWishList() // Fetch updated wishlist
        this._WishlistService.numOfWishItem.next(response.data.length) // Update wishlist count
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  // Remove all products from the wishlist
  removeAllFav() {
    this.allWishlist.map((product) =>
      // Remove each item in the wishlist
      this.removeItem(product._id)
    );
    this._WishlistService.numOfWishItem.next(0) // Reset wishlist count
  }


  // Add product to cart and remove from wishlist
  addToCart(productId: any) {
    const toast = this._ToastrService.info('Adding your product to cart...', '', { disableTimeOut: true });
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numOfCartItem.next(response.numOfCartItems) // Update cart item count
        this._ToastrService.clear(toast.toastId); // Clear the loading toast
        this._ToastrService.success('Product added to cart!')
        this.removeItem(productId) // Remove item from wishlist after adding to cart
      },
      error: (err) => {
        this._ToastrService.clear(toast.toastId);
        this._ToastrService.error('Failed to add product to cart.')
      }
    })
  }

  // Go back to the previous page
  goBack() {
    this._GoBackService.goBack()
  }
}
