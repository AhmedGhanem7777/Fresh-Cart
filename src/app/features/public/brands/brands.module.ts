import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands/brands.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    BrandsComponent,
    BrandDetailsComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule
  ]
})
export class BrandsModule { }
