import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit{

  // Array to hold the categories for the slider
  categories:any[]=[]

  constructor(private _ProductService:ProductService){}




  ngOnInit(): void {
    // Fetch the categories to be displayed in the slider when the component initializes
    this.getSliderCategoris()
  }

  // Fetches categories from the ProductService for the slider
  getSliderCategoris(){
    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        console.log('slider Category',response.data);
        
        // Update the categories array with the data received from the server
        this.categories=response.data
      }
    })
  }


  // Configuration options for the Owl Carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 6
      }
    },
    nav: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true
  }

  
}
