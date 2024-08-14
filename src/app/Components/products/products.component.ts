import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { GoBackService } from 'src/app/Services/go-back.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  allProducts:any[]=[]
  searchInput:string=''


  constructor(private _ProductService:ProductService,private _GoBackService:GoBackService,private _CartService:CartService,private _WishlistService:WishlistService){}

  ngOnInit(): void {
    // Fetch all products when the component initializes
    this.getAllProducts()
  }


  // Method to fetch all products
  getAllProducts(){
    this._ProductService.getAllProducts().subscribe({
      next:(response)=>{
        console.log(response.data);

        // Assign fetched products to the variable
        this.allProducts=response.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  // Method to add a product to the cart
  addToCart(productId:any){
    // Call CartService to add the product to the cart
    this._CartService.addProductToCart(productId)
  }


  // Method to add a product to the wishlist
  addToFav(productId:any){
    // Call WishlistService to add the product to the wishlist
    this._WishlistService.addToFav(productId)
  }


  // Method to handle navigation to the previous page
  goBack(){
    // Call GoBackService to navigate back
    this._GoBackService.goBack()
  }


}
