import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WishlistResponse } from '../../models/wishlist.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  // Observable to track the number of items in the wishlist
  numOfWishItem = new BehaviorSubject<number>(0);

  constructor(private _HttpClient: HttpClient) {
    // If the user is logged in, fetch their wishlist data and update the wishlist item count
    if (localStorage.getItem('userToken')) {
      this.getWishList().subscribe({
        next: (response) => {
          console.log('wish list', response);

          // Update the numOfWishItem observable with the count of items in the wishlist
          this.numOfWishItem.next(response.count)
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  // Adds a product to the wishlist by product ID
  addToWishList(wishId: string): Observable<WishlistResponse> {
    return this._HttpClient.post<WishlistResponse>(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: wishId
      },
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      })
  }

  // Retrieves the user's wishlist
  getWishList(): Observable<WishlistResponse> {
    if (typeof window !== 'undefined' && localStorage.getItem('userToken')) {
      return this._HttpClient.get<WishlistResponse>(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      });
    }
    return new Observable(observer => {
      observer.error('localStorage is not available in this environment.');
    });
  }

  // Removes an item from the wishlist by its ID
  removeWishItem(id: string): Observable<WishlistResponse> {
    return this._HttpClient.delete<WishlistResponse>(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    )
  }
}
