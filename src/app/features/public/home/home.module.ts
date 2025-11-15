import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CategorySliderComponent } from './category-slider/category-slider.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    CategorySliderComponent,
    HomeSliderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    CarouselModule,
    SharedModule
  ]
})
export class HomeModule { }
