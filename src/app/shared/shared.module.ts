import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CuttextPipe } from './pipes/cuttext.pipe';
import { RatingPipe } from './pipes/rating.pipe';
import { SearchProductsPipe } from './pipes/search-products.pipe';



@NgModule({
  declarations: [
    FooterComponent,
    LoadingComponent,
    NavbarComponent,
    NotFoundComponent,
    ProductCardComponent,
    ScrollToTopComponent,
    CuttextPipe,
    RatingPipe,
    SearchProductsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    SearchProductsPipe,
    CuttextPipe,
    LoadingComponent,
    ScrollToTopComponent
  ]
})
export class SharedModule { }
