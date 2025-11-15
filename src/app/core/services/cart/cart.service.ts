import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShippingAddress, CheckoutResponse } from '../../models/checkout.interface';
import { CartResponse } from '../../models/cart.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  // BehaviorSubject to track the number of items in the cart
  numOfCartItem: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor(private _HttpClient: HttpClient) {
    // Check if running in a browser environment and a token exists in localStorage
    if (localStorage.getItem('userToken')) {
      this.getLoggedUserData().subscribe({
        next: (response) => {
          this.numOfCartItem.next(response.numOfCartItems)
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // Get the cart data for the logged-in user
  getLoggedUserData(): Observable<CartResponse> {
    return this._HttpClient.get<CartResponse>('https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    )
  }

  // Add a product to the cart
  addToCart(productId: string): Observable<CartResponse> {
    return this._HttpClient.post<CartResponse>('https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: productId
      },
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    )
  }

  // Remove a product from the cart
  removeCartItem(productId: string): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    )
  }

  // Update the quantity of a product in the cart
  updateItemCount(productId: string, count: number): Observable<CartResponse> {
    return this._HttpClient.put<CartResponse>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count
      },
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    )
  }

  // Clear all items from the cart
  clearCart(): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    );
  }

  // Initiate online payment for the cart
  onlinePayment(shippingAddress: ShippingAddress, cartId: string): Observable<CheckoutResponse> {
    return this._HttpClient.post<CheckoutResponse>(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: shippingAddress
      },
      {
        headers: { token: localStorage.getItem('userToken') || '' }
      }
    )
  }

  // Initiate cash-on-delivery payment for the cart
  cashPayment(shippingAddress: ShippingAddress, cartId: string): Observable<CheckoutResponse> {
    return this._HttpClient.post<CheckoutResponse>(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        shippingAddress: shippingAddress
      },
      {
        headers: { token: localStorage.getItem('userToken') || '' }
      }
    )
  }
}
