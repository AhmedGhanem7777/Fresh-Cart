import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user/user.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false; // Tracks user login status
  cartNumber: number = 0 // Number of items in the cart
  wishNumber: number = 0 // Number of items in the wishlist
  userProfileData: any = [] // User profile data
  userId: string = '' // Logged-in user ID
  decodeduserToken: any // Decoded JWT token
  profileImage: any // Profile image of the user


  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _UserService: UserService, private _CartService: CartService, private _WishlistService: WishlistService) {
    this.checkIsLogin()
  }

  ngOnInit(): void {
    this.decodedToken() // Decode user token to extract user data
    this.profileImage = localStorage.getItem('profileImage') // Load saved profile image from localStorage

    this.updateNumOfCartItems()
    this.updateNumOfWishlistItems()
    this.getUserProfileDataById()
  }



  checkIsLogin() {
    this._AuthService.userData.subscribe({
      next: () => {
        // Set isLogin to true if user data is not null
        if (this._AuthService.userData.getValue() !== null) {
          // this.isLogin.next(true)
          this.isLogin = true
        } else {
          // this.isLogin.next(false)
          this.isLogin = false
        }
      }
    });
  }


  // Method to decode the JWT token and extract user data
  decodedToken() {
    this.decodeduserToken = this._AuthService.decodeUserData() // Decode user token to get user data
    this.userId = this.decodeduserToken.id
  }


  // Method to update the number of items in the cart
  updateNumOfCartItems() {
    this._CartService.numOfCartItem.subscribe({
      next: (value: any) => {
        // Update cartNumber with the current number of cart items
        this.cartNumber = value
      }
    })
  }


  // Method to update the number of items in the wishlist
  updateNumOfWishlistItems() {
    this._WishlistService.numOfWishItem.subscribe({
      next: (value: any) => {
        // Update wishNumber with the current number of wishlist items
        this.wishNumber = value
      }
    })
  }


  // Method to fetch user profile data by user ID
  getUserProfileDataById() {
    if (this.userId) {
      this._UserService.getUserProfileDataById(this.userId).subscribe({
        next: (response) => {
          console.log('user profile data in navbar', response.data);
          this._WishlistService.numOfWishItem.next(response.data.wishlist.length)

          this.userProfileData = response.data // Set userProfileData with the fetched data
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }


  logOut() {
    this._AuthService.logOut()
  }
}
