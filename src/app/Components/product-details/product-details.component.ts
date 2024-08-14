import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  productId:any=''
  productDetails:any={}
  allProducts:any=[]
  filteredProducts :any=[]
  currentCategory:string=''
  // productImages:any[]=[]

  

  constructor(private _ActivatedRoute:ActivatedRoute,private _WishlistService:WishlistService,private _ProductService:ProductService,private _CartService:CartService){}

  ngOnInit(): void {
    // Fetch product details by ID when the component initializes
    this.getProductDetailsById()

    // Fetch all products when the component initializes
    this.getAllProducts()
  }


  // Method to fetch product details by ID
  getProductDetailsById(){
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id'); // Get product ID from route parameters
        if (this.productId) {
          this._ProductService.getProductDetails(this.productId).subscribe({
            next: (response) => {
              this.productDetails = response.data; // Assign product details to the variable
              this.currentCategory=this.productDetails.category.name // Set the current category
              // this.productImages=response.data.images
              console.log(this.productDetails);
              console.log(this.currentCategory);
              
            },
            error: (err) => {
              console.error('Error fetching details:', err);
            },
          });
        }
      },
    });
  }


  // Method to fetch all products
  getAllProducts(){
    this._ProductService.getAllProducts().subscribe({
      next:(response)=>{
        console.log('All product',response);

        // Assign all products to the variable
        this.allProducts =response.data

        // Filter products based on the current category
        this.filterProducts(this.currentCategory)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  // Method to add a product to the cart
  addToCart(productId:any){
     // Call CartService to add product to the cart
    this._CartService.addProductToCart(productId)
  }


  // Method to add a product to the wishlist
  addToFav(productId:any){
    this._WishlistService.addToFav(productId) // Call WishlistService to add product to the wishlist
  }


  // Method to filter products based on the current category
  filterProducts(currentCategory:string){
    // Filter products by category
    this.filteredProducts=this.allProducts.filter((product:any) => product.category.name === currentCategory);
    console.log('Filtered',this.filteredProducts);
  }



  // Custom options for OwlCarousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true
  }

}
















