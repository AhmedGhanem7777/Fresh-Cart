import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Array to hold the list of products
  allProducts:any[]=[]

  constructor(private _ProductService:ProductService,private _ToastrService:ToastrService,private _CartService:CartService,private _WishlistService:WishlistService){}

  ngOnInit(): void {
    // Fetch limited products when the component initializes
    this.getLimitProducts()
  }

  // Fetches a limited set of products from the ProductService
  getLimitProducts(){
    this._ProductService.getLimitProducts().subscribe({
      next:(response)=>{
        console.log(response.data);

        // Store the fetched products in the component
        this.allProducts=response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  // Adds a product to the cart
  addToCart(productId:any){
    // Call CartService to add the product to the cart
    this._CartService.addProductToCart(productId)
  }

  // Adds a product to the wishlist
  addToFav(productId:any){
    // Call WishlistService to add the product to the wishlist
    this._WishlistService.addToFav(productId)
  }








}
