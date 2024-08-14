import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { GoBackService } from 'src/app/Services/go-back.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allWishlist: any[] = []

  constructor(private _WishlistService: WishlistService, private _CartService: CartService,private _GoBackService:GoBackService) { }


  ngOnInit(): void {
    // Fetch the wishlist items on component initialization
    this.getWishList()
  }

  // Method to fetch the wishlist items
  getWishList(){
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log('response: ',response);

        // Update the wishlist array
        this.allWishlist = response.data
        console.log('all wish list', this.allWishlist);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  // Method to remove an item from the wishlist
  removeItem(productId: any) {
    this._WishlistService.removeWishItem(productId).subscribe({
      next: (response) => {
        console.log('Remove wish item',response);
        this.allWishlist = response.data // Update the wishlist array
        this.getWishList() // Refresh the wishlist
        this._WishlistService.numOfWishItem.next(response.data.length) // Update the number of wishlist items
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  // Method to add a product to the cart
  addToCart(productId: any) {
    this._CartService.addProductToCart(productId)
  }


  // Method to remove all items from the wishlist
  removeAllFav(){
    // Remove each item from the wishlist
    this.allWishlist.map((product) =>
      this.removeItem(product._id)
    );

    // Update the number of wishlist items to 0
    this._WishlistService.numOfWishItem.next(0)
  }


  // Method to go back to the previous page
  goBack(){
    this._GoBackService.goBack()
  }

}
