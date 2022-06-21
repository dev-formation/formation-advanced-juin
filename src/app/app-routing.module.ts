import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }, // localhost:4200
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
  { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


