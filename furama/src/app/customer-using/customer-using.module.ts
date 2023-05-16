import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerUsingRoutingModule } from './customer-using-routing.module';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerUsingRoutingModule,
    NgxPaginationModule
  ]
})
export class CustomerUsingModule { }
