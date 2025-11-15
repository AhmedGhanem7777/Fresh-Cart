import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoBackService } from '../../../../core/services/global/go-back.service';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit{
  categoryId: string = ''; // Holds the ID of the selected category
  categoryDetails: any[] = []; // Holds the details of the selected category
  isLoading: boolean = true; // Boolean to manage the loading state

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _GoBackService: GoBackService,
    private _ProductsService: ProductsService
  ) { }

  ngOnInit(): void {
    // Fetch the category ID when the component initializes
    this.getCategoryId();
  }

  // Retrieves the category ID from the route parameters
  getCategoryId() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id'); // Extract category ID from route
        if (id) {
          this.categoryId = id;
          // Fetch category details
          this.getDataById();
        }
      },
      error: (err) => {
        this.isLoading = false; // Stop loading if error occurs
      }
    });
  }

  // Fetches category details by ID using ProductService
  getDataById() {
    this._ProductsService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        this.categoryDetails = response.data; // Store category details
        this.isLoading = false; // Stop loading
      },
      error: (err) => {
        this.isLoading = false; // Stop loading
      }
    });
  }

  // Navigates back to the previous page
  goBack() {
    this._GoBackService.goBack()
  }

}
