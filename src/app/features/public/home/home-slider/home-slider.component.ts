import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss'
})
export class HomeSliderComponent {
  // Configuration options for the Owl Carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<span class="nav-btns nav-prev"><i class="fa fa-chevron-left"></i></span>',
      '<span class="nav-btns nav-next"><i class="fa fa-chevron-right"></i></span>'],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
  }

  // Method to scroll to the products section
  scrollToProducts(): void {
    const offset = window.innerWidth <= 768 ? 800 : 1250;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
}
