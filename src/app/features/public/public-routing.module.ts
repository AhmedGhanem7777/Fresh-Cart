import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) ,title:'Home'},
  { path: 'products', loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule) ,title:'Products'},
  { path: 'brands', loadChildren: () => import('./brands/brands.module').then((m) => m.BrandsModule) ,title:'Brands'},
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule) ,title:'Categories'},
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule), canActivate: [authGuard] ,title:'Cart'},
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then((m) => m.WishlistModule), canActivate: [authGuard] ,title:'Wishlist'},
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule) ,title:'Profile'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
