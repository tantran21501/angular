import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerModule} from "./customer/customer.module";
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {EmployeeModule} from "./employee/employee.module";
import {OfficeModule} from "./office/office.module";
import {NgxPaginationModule} from "ngx-pagination";
import {ContractComponent} from "./contract/contract.component";
import {ContractModule} from "./contract/contract.module";
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import {ContractDetailModule} from "./contract-detail/contract-detail.module";
import { CustomerUsingComponent } from './customer-using/customer-using.component';
import {CustomerUsingModule} from "./customer-using/customer-using.module";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ContractDetailComponent,
    CustomerUsingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerModule,
    HttpClientModule,
    EmployeeModule,
    OfficeModule,
    NgxPaginationModule,
    ContractModule,
    ContractDetailModule,
    CustomerUsingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
