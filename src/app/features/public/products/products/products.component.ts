import { Component, OnInit } from '@angular/core';
import { GoBackService } from '../../../../core/services/global/go-back.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = []; // Array to hold all product data
  searchInput: string = ''; // String to store user input for search functionality
  isLoading: boolean = false; // Boolean flag to track loading state

  constructor(
    private _ProductsService: ProductsService,
    private _GoBackService: GoBackService
  ) { }

  ngOnInit(): void {
    // Fetch all products when the component loads
    this.getAllProducts();
  }


  // Method to fetch all products from the ProductService
  getAllProducts(): void {
    this.isLoading = true; // Set loading state to true
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data; // Store fetched products in the array
        this.isLoading = false; // Set loading state to false after successful fetch
      },
      error: (err) => {
        this.isLoading = false; // Reset loading state to false even on error
      }
    });
  }

  // Method to navigate back to the previous page
  goBack(): void {
    this._GoBackService.goBack();
  }
}
