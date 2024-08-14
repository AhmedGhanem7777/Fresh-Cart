import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  // BehaviorSubject to track the number of items in the user's cart
  numOfCartItem: any = new BehaviorSubject(0);


  constructor(private _HttpClient:HttpClient,private _ToastrService:ToastrService) {
    // If the user is logged in, fetch their cart data and update the cart item count
    if(localStorage.getItem('userToken')){
      // If a token is found, fetch the logged-in user's cart data
      this.getLoggedUserData().subscribe({
        // On a successful response, update the BehaviorSubject with the number of items in the cart
        next: (response) => {
            console.log('Your Cart',response);

            // Update the BehaviorSubject with the new number of items in the cart
            this.numOfCartItem.next(response.numOfCartItems)
        },
        // Handle any errors that occur during the HTTP request
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


  // Retrieves the logged-in user's cart data
  getLoggedUserData():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart'
    )
  }

  // Adds a product to the user's cart by its product ID
  addToCart(cartId:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId:cartId
      }
    )
  }

  // Removes a specific item from the cart by its product ID
  removeCartItem(productId:any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    )
  }

  // Updates the quantity of a specific item in the cart
  updateItemCount(productId:any,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count:count
      }
    )
  }

  // Clears all items in the user's cart
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`
    );
  }

  // Initiates an online payment process for the items in the cart
  onlinePayment(shippingAddress:any,cartId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: shippingAddress
      }
    )
  }

  // Initiates a cash-on-delivery payment for the items in the cart
  cashPayment(shippingAddress:any,cartId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        shippingAddress: shippingAddress
      }
    )
  }



   // Adds a product to the cart and updates the number of cart items
  addProductToCart(productId:any){
    this.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response);

        // Updates the BehaviorSubject with the new number of items in the cart
        this.numOfCartItem.next(response.numOfCartItems)
        console.log(response.numOfCartItems);
        this._ToastrService.success('Product added to cart successfully', 'Success')
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}







