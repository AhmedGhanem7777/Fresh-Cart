import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { authGuard } from './Guards/auth.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { CategoryDetailsComponent } from './Components/category-details/category-details.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { BrandDetailsComponent } from './Components/brand-details/brand-details.component';
import { PersonaldetailComponent } from './Components/personaldetail/personaldetail.component';
import { ChangepassComponent } from './Components/changepass/changepass.component';
import { AddaddressComponent } from './Components/addaddress/addaddress.component';
import { ProfileSettingComponent } from './Components/profile-setting/profile-setting.component';
import { ForgotPassComponent } from './Components/forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './Components/reset-pass/reset-pass.component';
import { CreateNewPassComponent } from './Components/create-new-pass/create-new-pass.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  { path: 'productdetails/:id', canActivate: [authGuard], component: ProductDetailsComponent },
  { path: 'categories', canActivate: [authGuard], component: CategoriesComponent },
  { path: 'categorydetails/:id', canActivate: [authGuard], component: CategoryDetailsComponent },
  { path: 'brands', canActivate: [authGuard], component: BrandsComponent },
  { path: 'branddetails/:id', canActivate: [authGuard], component: BrandDetailsComponent },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent },
  { path: 'allorders', canActivate: [authGuard], component: AllordersComponent },
  {
    path: 'profilesetting', canActivate: [authGuard], component: ProfileSettingComponent, children: [
      { path: '', redirectTo: 'personaldetail', pathMatch: 'full' },
      { path: 'personaldetail', component: PersonaldetailComponent },
      { path: 'changepass', component: ChangepassComponent },
      { path: 'addadress', component: AddaddressComponent },
      { path: '**', component: NotFoundComponent },
    ]
  },
  { path: 'checkout', canActivate: [authGuard], component: CheckoutComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpass', component: ForgotPassComponent },
  { path: 'resetpass', component: ResetPassComponent },
  { path: 'createnewpass', component: CreateNewPassComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
