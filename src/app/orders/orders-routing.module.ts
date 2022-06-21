import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAddOrderComponent } from './pages/page-add-order/page-add-order.component';
import { PageEditOrderComponent } from './pages/page-edit-order/page-edit-order.component';
import { PageListOrdersComponent } from './pages/page-list-orders/page-list-orders.component';


const routes: Routes = [
  // préfixe /orders
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  {
    path: '', 
    component: PageListOrdersComponent, // /orders
    children: [
      { path: 'add', component: PageAddOrderComponent }, // /orders/add
      { path: 'edit/:id', component: PageEditOrderComponent } // /orders/edit/1
    ]
  },
  //ne seront jamais atteintes car les routes children l'emportent
  { path: 'add', component: PageAddOrderComponent }, // /orders/add 
  { path: 'edit/:id', component: PageEditOrderComponent } // /orders/edit/1

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
