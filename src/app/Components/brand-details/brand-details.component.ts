import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';


@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit{
  brandId:any='' // Variable to store the brand ID from the route parameters
  brandDetails:any=[] // Array to hold details of the brand

  constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private _WishlistService:WishlistService,private _ProductService:ProductService){}

  // Lifecycle hook to initialize component and fetch brand details
  ngOnInit(): void {
    // Fetch the brand ID from the route parameters
    this.getBrandId()
  }

  // Method to get the brand ID from the route parameters
  getBrandId(){
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
         // Extract brand ID from route parameters
        this.brandId=params.get('id')

        // Fetch brand details using the extracted brand ID
        this.getDataById()
      },
      error:(err)=>{
      }
    })
  }


  // Method to fetch brand details using the brand ID
  getDataById(){
    this._ProductService.getBrandById(this.brandId).subscribe({
      next:(response)=>{
        // Assign fetched brand details to the component property
        this.brandDetails=response.data

        console.log('brand details',response.data);
        
      },
      error:(err)=>{
        
      }
    })
  }


  // Method to add a product to the cart
  addToCart(productId:any){
    this._CartService.addProductToCart(productId)
  }


  // Method to add a product to the wishlist
  addToFav(productId:any){
    this._WishlistService.addToFav(productId)
  }

}
