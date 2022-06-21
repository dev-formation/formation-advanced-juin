import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadStrategyService } from './core/services/custom-preload-strategy.service';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }, // localhost:4200
  { 
    path: 'orders', 
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), 
    data : { preload: true}
  },
  { 
    path: 'clients', 
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) 
  },
  { 
    path: '**', 
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule), 
    data : { preload: true}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { preloadingStrategy: CustomPreloadStrategyService })],
    providers: [CustomPreloadStrategyService],
  exports: [RouterModule]
})
export class AppRoutingModule { }


