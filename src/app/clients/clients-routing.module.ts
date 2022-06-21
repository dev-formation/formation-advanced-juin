import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from '../core/guards/is-auth.guard';
import { ListOrderResolver } from '../orders/resolvers/list-order.resolver';
import { PageAddClientComponent } from './pages/page-add-client/page-add-client.component';
import { PageEditClientComponent } from './pages/page-edit-client/page-edit-client.component';
import { PageListClientsComponent } from './pages/page-list-clients/page-list-clients.component';
import { ListClientResolver } from './resolvers/list-client.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: PageListClientsComponent,
    resolve: {
      'clients': ListClientResolver
    },
    children : [
      { 
        path: 'add', 
        canActivate: [IsAuthGuard], 
        component: PageAddClientComponent 
      },
      { 
        path: 'edit/:id', 
        canActivate: [IsAuthGuard], 
        component: PageEditClientComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
