import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeSliderComponent } from './Components/home-slider/home-slider.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { CategorySliderComponent } from './Components/category-slider/category-slider.component';
import { CategoryDetailsComponent } from './Components/category-details/category-details.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { CuttextPipe } from './Pipes/cuttext.pipe';
import { BrandDetailsComponent } from './Components/brand-details/brand-details.component';
import { ProfileSettingComponent } from './Components/profile-setting/profile-setting.component';
import { PersonaldetailComponent } from './Components/personaldetail/personaldetail.component';
import { ChangepassComponent } from './Components/changepass/changepass.component';
import { AddaddressComponent } from './Components/addaddress/addaddress.component';
import { SideBarProfileComponent } from './Components/side-bar-profile/side-bar-profile.component';
import { ForgotPassComponent } from './Components/forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './Components/reset-pass/reset-pass.component';
import { CreateNewPassComponent } from './Components/create-new-pass/create-new-pass.component';
import { SearchProductsPipe } from './Pipes/search-products.pipe';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { LoadingComponent } from './Components/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
import { RatingPipe } from './Pipes/rating.pipe';
import { LoadingInterceptor } from './interceptors/loading.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    ProductsComponent,
    CartComponent,
    CategoriesComponent,
    BrandsComponent,
    HomeSliderComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    AllordersComponent,
    CategorySliderComponent,
    CategoryDetailsComponent,
    WishlistComponent,
    CuttextPipe,
    BrandDetailsComponent,
    ProfileSettingComponent,
    PersonaldetailComponent,
    ChangepassComponent,
    AddaddressComponent,
    SideBarProfileComponent,
    ForgotPassComponent,
    ResetPassComponent,
    CreateNewPassComponent,
    SearchProductsPipe,
    LoadingComponent,
    RatingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton:true,
      progressBar:true
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:HeaderInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
