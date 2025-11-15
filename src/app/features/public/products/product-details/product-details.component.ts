import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productId: any = '' // Holds the product ID from route parameters
  productDetails: any = {} // Object to hold product details
  allProducts: any = [] // Array to store all products
  filteredProducts: any = [] // Array to store products filtered by category
  currentCategory: string = '' // Holds the current category name
  isLoading: boolean = true // Loading state for the component


  constructor(private _ActivatedRoute: ActivatedRoute, private _ToastrService: ToastrService, private _WishlistService: WishlistService, private _ProductsService: ProductsService, private _CartService: CartService) { }

  ngOnInit(): void {
    this.getProductDetailsById() // Fetch product details by ID when the component initializes    
    this.getAllProducts() // Fetch all products when the component initializes
  }


  // Fetches product details using the product ID
  getProductDetailsById() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id'); // Extract product ID from route parameters
        if (this.productId) {
          this._ProductsService.getProductDetails(this.productId).subscribe({
            next: (response) => {
              this.productDetails = response.data; // Assign product details
              this.currentCategory = this.productDetails.category.name // Set current category              
            },
            error: (err) => {
              console.error('Error fetching details:', err);
            },
          });
        }
      },
    });
  }


  // Adds a product to the cart
  addToCart(productId: any) {
    const toast = this._ToastrService.info('Adding your product to cart...', '', { disableTimeOut: true });

    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numOfCartItem.next(response.numOfCartItems) // Update cart item count
        this._ToastrService.clear(toast.toastId); // Clear the loading toast
        this._ToastrService.success('Product added to cart!') // Show success toast
      },
      error: (err) => {
        this._ToastrService.clear(toast.toastId); // Clear the loading toast
        this._ToastrService.error('Failed to add product to cart.') // Show error toast
      }
    })
  }


  // Adds a product to the wishlist
  addToFav(productId: any) {
    const toast = this._ToastrService.info('Adding your product to wishlist...', '', { disableTimeOut: true });
    this._WishlistService.addToWishList(productId).subscribe({
      next: (reponse) => {
        this._WishlistService.numOfWishItem.next(reponse.data.length) // Update wishlist item count
        this._ToastrService.clear(toast.toastId); // Clear the loading toast
        this._ToastrService.success('Product added to wishlist!'); // Show success toast
      },
      error: (err) => {
        this._ToastrService.clear(toast.toastId); // Clear the loading toast
        this._ToastrService.error('Failed to add product to wishlist.') // Show error toast
      }
    })
  }


  // Fetches all products
  getAllProducts() {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data // Store all products
        this.filterProducts(this.currentCategory) // Filter products by category
        this.isLoading = false // Set loading to false
      },
      error: (err) => {
        this.isLoading = false // Set loading to false

      }
    })
  }


  // Filters products based on the current category
  filterProducts(currentCategory: string) {
    this.filteredProducts = this.allProducts.filter((product: any) => product.category.name === currentCategory); // Match products by category name
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
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true
  }
}
