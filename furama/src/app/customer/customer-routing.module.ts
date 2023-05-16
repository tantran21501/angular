import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from "./customer.component";


const routes: Routes = [
  {
    path: 'list',
    component: CustomerComponent
  }
  // {
  //   path: 'create',
  //   component: ProductCreateComponent
  // },
  // {
  //   path: 'edit/:id',
  //   component: ProductEditComponent,
  //
  // },{
  //   path: 'delete/:id',
  //   component: ProductDeleteComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
