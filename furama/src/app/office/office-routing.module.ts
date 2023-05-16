import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from "../customer/customer.component";
import {OfficeComponent} from "./office.component";


const routes: Routes = [
  {
    path: 'list',
    component: OfficeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
