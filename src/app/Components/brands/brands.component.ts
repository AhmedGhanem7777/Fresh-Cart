import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  // Array to store the list of brands fetched from the ProductService
  brands:any[]=[]

  // Injecting ProductService to fetch brand data
  constructor(private _ProductService:ProductService){}

  // Lifecycle hook to initialize component and fetch brand data
  ngOnInit(): void {
    // Call method to fetch brands when the component initializes
    this.getBrnds()
  }

  // Method to fetch the list of brands from the ProductService
  getBrnds(){
    this._ProductService.getBrands().subscribe({
      next:(response)=>{
        // On successful response, assign the list of brands to the component property
        this.brands=response.data
      },
      error:(err)=>{
        
      }
    })
  }
  
}
