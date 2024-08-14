import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  // Array to hold the categories
  categories: any[] = [];

  // Inject ProductService to interact with the backend API
  constructor(private _ProductService: ProductService) {}

  // Lifecycle hook that is called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    // Fetch all categories when the component initializes
    this.getAllCategories()
  }

  // Fetches all categories from the ProductService
  getAllCategories(){
    this._ProductService.getCategories().subscribe({
      next: (resopnse) => {
        // Update the categories array with the received data
        this.categories = resopnse.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

