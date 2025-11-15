import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile-setting', pathMatch: 'full' },
  {
    path: 'profile-setting', component: ProfileSettingComponent, children:
      [
        { path: '', redirectTo: 'personal-details', pathMatch: 'full' },
        { path: 'personal-details', component: PersonalDetailsComponent ,title:'Personal Details'},
        { path: 'change-pass', component: ChangePassComponent ,title:'Change Password'},
        { path: 'add-address', component: AddAddressComponent ,title:'Add Address'},
        { path: '**', component: NotFoundComponent ,title:'Error 404'},
      ]
  },
  { path: '**', component: NotFoundComponent ,title:'Error 404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
