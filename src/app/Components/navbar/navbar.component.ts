import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';
import { WishlistService } from 'src/app/Services/wishlist.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit{
  // Reference to the dropdown menu element
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  
  // Variables to manage login state, cart number, wishlist number, user profile data, and user ID
  isLogin:boolean=false
  cartNumber:any=0
  wishNumber:any=0
  userProfileData:any=[]
  userId:any=''
  decodeduserToken:any

  constructor(private _AuthService:AuthService,private _ToastrService:ToastrService,private _UserService:UserService,private _CartService:CartService,private _WishlistService:WishlistService) {}



  ngOnInit(): void {
    // Check if userToken exists in localStorage and decode it
    if(localStorage.getItem('userToken')){
      this.decodedToken()
    }

    this.refreshCartBadge()

    // Check if the user is logged in
    this.checkIsLogin()

    // Update the number of items in the cart and wishlist
    this.updateNumOfCartItems()
    this.updateNumOfWishlistItems()

    // Fetch user profile data if available
    this.getUserProfileDataById()
  }


  // Method to check if the user is logged in
  checkIsLogin(){
    this._AuthService.userData.subscribe({
      next:()=>{
        // Set isLogin to true if user data is not null
        if(this._AuthService.userData.getValue()!==null){
          this.isLogin=true
        }else{
          this.isLogin=false
        }
      }
    });
  }


  // Method to update the number of items in the cart
  updateNumOfCartItems(){
    this._CartService.numOfCartItem.subscribe({
      next:(value:any)=>{
        // Update cartNumber with the current number of cart items
        this.cartNumber=value
      }
    })
  }


  // Method to update the number of items in the wishlist
  updateNumOfWishlistItems(){
    this._WishlistService.numOfWishItem.subscribe({
      next:(value:any)=>{
        // Update wishNumber with the current number of wishlist items
        this.wishNumber=value
      }
    })
  }


  // Method to fetch user profile data by user ID
  getUserProfileDataById(){
    if(this.userId){
      this._UserService.getUserProfileDataById(this.userId).subscribe({
        next:(response)=>{
          console.log('user profile data in navbar',response.data);
          this.userProfileData=response.data // Set userProfileData with the fetched data
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    
    }
  }


  // Method to handle user logout
  logout(){
    this._AuthService.logout(); // Call the logout method from AuthService
    this._ToastrService.info("Logged Out")
    this.hideDropdown(); // Hide the dropdown menu after logging out
  }


  // Method to decode the JWT token and extract user data
  decodedToken() {
    this.decodeduserToken =this._AuthService.decodeUserData() // Decode user token to get user data
    this.userId=this.decodeduserToken.id // Extract user ID from the decoded token
  }


  // Method to hide the dropdown menu
  hideDropdown() {
    const dropdownMenu = this.dropdownMenu.nativeElement as HTMLElement; // Access the dropdown menu element
    if (dropdownMenu.classList.contains('show')) {
      // Remove 'show' class to hide the dropdown menu
      dropdownMenu.classList.remove('show');
    }
  }


  refreshCartBadge(){
        // If the user is logged in, fetch their cart data and update the cart item count
        if(localStorage.getItem('userToken')){
          // If a token is found, fetch the logged-in user's cart data
          this._CartService.getLoggedUserData().subscribe({
            // On a successful response, update the BehaviorSubject with the number of items in the cart
            next: (response) => {
                console.log('Your Cart',response);
    
                // Update the BehaviorSubject with the new number of items in the cart
                this._CartService.numOfCartItem.next(response.numOfCartItems)
            },
            // Handle any errors that occur during the HTTP request
            error: (err) => {
              console.log(err);
            },
          });
        }
  }

}
