import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerUsingComponent} from "./customer-using.component";


const routes: Routes = [
  {
    path:"list",
    component:CustomerUsingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerUsingRoutingModule { }
