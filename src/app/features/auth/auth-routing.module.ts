import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NewPassComponent } from './new-pass/new-pass.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent ,title:'Register'},
  { path: 'login', component: LoginComponent ,title:'Login'},
  { path: 'forgot-pass', component: ForgotPassComponent ,title:'Forgot PAssword'},
  { path: 'verify-email', component: VerifyEmailComponent ,title:'Verify Email'},
  { path: 'new-pass', component: NewPassComponent ,title:'New Password'},
  { path: '**', component: NotFoundComponent ,title:'Error 404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
