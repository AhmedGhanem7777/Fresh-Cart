import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { GoBackService } from 'src/app/Services/go-back.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{

  // Holds the category ID retrieved from the route parameters
  categoryId:any=''

  // Holds the details of the category retrieved from the API
  categoryDetaile:any=[]

  // Inject necessary services into the component
  constructor(private _ProductService:ProductService,private _GoBackService:GoBackService,private _ActivatedRoute:ActivatedRoute,private _WishlistService:WishlistService,private _CartService:CartService){}

  // Lifecycle hook that is called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    // Retrieve the category ID from the route parameters when the component initializes
    this.getCategoryId()
  }

  // Retrieves the category ID from the route parameters
  getCategoryId(){
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        console.log(params);
        // Get the 'id' parameter from the route
        this.categoryId=params.get('id')

        // If a valid category ID is present, fetch the category details
        if(this.categoryId){
          this.getDataById()
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  // Fetches category details based on the category ID
  getDataById(){
    this._ProductService.getCategoryById(this.categoryId).subscribe({
      next:(response)=>{
        // Update categoryDetaile with the data received from the API
        this.categoryDetaile=response.data
        console.log('data: ',this.categoryDetaile);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  // Adds a product to the cart based on the product ID
  addToCart(productId:any){
    this._CartService.addProductToCart(productId)
  }


  // Adds a product to the wishlist based on the product ID
  addToFav(productId:any){
    this._WishlistService.addToFav(productId)
  }


  // Navigates back to the previous page
  goBack(){
    this._GoBackService.goBack()
  }


}
