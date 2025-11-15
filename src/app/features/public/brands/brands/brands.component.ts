import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  brands: Brand[] = [] // Array to store the list of brands fetched from the ProductService
  isLoading: boolean = true // Flag to indicate loading state

  constructor(private _ProductsService: ProductsService) { }

  ngOnInit(): void {
    // Call method to fetch brands when the component initializes
    this.getBrands()
  }

  // Method to fetch the list of brands from the ProductService
  getBrands() {
    this._ProductsService.getBrands().subscribe({
      next: (response) => {
        this.isLoading = false // Set loading flag to false after data is fetched successfully
        this.brands = response.data // On successful response, assign the list of brands to the component property
      },
      error: (err) => {
        this.isLoading = false // Set loading flag to false in case of error
      }
    })
  }
}
