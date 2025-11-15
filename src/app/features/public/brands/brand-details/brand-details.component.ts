import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoBackService } from '../../../../core/services/global/go-back.service';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit{
  brandId: string = ''; // Holds the brand ID fetched from the route
  brandDetails: any[] = []; // Array to store the brand details fetched from the API
  isLoading: boolean = true; // Flag to indicate if data is being loaded

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _GoBackService: GoBackService,
    private _ProductsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getBrandId(); // Fetch the brand ID from route parameters on initialization
  }

  // Method to get the brand ID from the URL parameter
  getBrandId() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id'); // Retrieve the 'id' parameter from the URL
        if (id) {
          this.brandId = id; // Set the brandId if a valid id is found
          this.getDataById(); // Fetch the brand details using the brand ID
        }
      },
      error: (err) => {
        console.error('Error getting brand ID:', err);
        this.isLoading = false; // Set loading flag to false in case of error
      }
    });
  }

  // Method to fetch the brand details from the API using the brand ID
  getDataById() {
    this._ProductsService.getBrandById(this.brandId).subscribe({
      next: (response) => {
        this.brandDetails = response.data; // Set the fetched brand details to the brandDetails array
        this.isLoading = false; // Set loading flag to false after data is successfully fetched
      },
      error: (err) => {
        console.error('Error fetching brand details:', err);
        this.isLoading = false; // Set loading flag to false in case of error
      }
    });
  }

  // Method to go back to the previous page using the GoBackService
  goBack() {
    this._GoBackService.goBack()
  }
}
