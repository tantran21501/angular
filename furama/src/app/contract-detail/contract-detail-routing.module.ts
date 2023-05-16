import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContractDetailComponent} from "./contract-detail.component";


const routes: Routes = [
  {
    path:"list",
    component:ContractDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractDetailRoutingModule { }
