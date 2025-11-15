import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),title:'Auth' },
  { path: 'public', loadChildren: () => import('./features/public/public.module').then((m) => m.PublicModule) },
  { path: 'allorders', loadChildren: () => import('./features/public/orders/orders.module').then((m) => m.OrdersModule), canActivate: [authGuard],title :'All Orders' },
  { path: '**', component: NotFoundComponent ,title:'Error 404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
