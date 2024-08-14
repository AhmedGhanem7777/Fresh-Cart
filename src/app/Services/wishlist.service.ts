import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // Observable to track the number of items in the wishlist
  numOfWishItem:any = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient,private _ToastrService:ToastrService) { 
    // If the user is logged in, fetch their wishlist data and update the wishlist item count
    if(localStorage.getItem('userToken')){
      // Make an HTTP GET request to fetch the wishlist data
      this.getWishList().subscribe({
        next:(response)=>{
          console.log('wish list',response);

          // Update the numOfWishItem observable with the count of items in the wishlist
          this.numOfWishItem.next(response.count)
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }


  // Adds a product to the wishlist by product ID
  addToWishList(wishId: any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: wishId
      })
  }

  // Retrieves the user's wishlist
  getWishList(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }

  // Removes an item from the wishlist by its ID
  removeWishItem(id: any): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    )
  }


  // Adds a product to the user's wishlist (favorites)
  addToFav(productId:any){
    this.addToWishList(productId).subscribe({
      next:(reponse)=>{
        console.log('response for wishlist in home',reponse);

        // Updates the number of wishlist items by emitting the new count
        this.numOfWishItem.next(reponse.data.length)
        this._ToastrService.success('Product added to wish list successfully', 'Success')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
