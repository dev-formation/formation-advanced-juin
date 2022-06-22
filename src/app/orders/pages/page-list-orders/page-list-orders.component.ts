import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, pluck, Subject, Subscription, tap } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { VersionService } from 'src/app/core/services/version.service';
import { OrdersService } from '../../services/orders.service';
import { Store } from "@ngrx/store";
import { selectAllOrders } from '../../store/selectors/orders.selectors';
import { getAllOrdersAction } from '../../store/actions/orders.actions';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss']
})
export class PageListOrdersComponent implements OnInit, OnDestroy {
  public titleParent = 'Liste de commandes';
  // public collection!: Order[];
  public collection$: Observable<Order[]>;
  public headers: string[];
  public collection!: Order[]; 

  public titleTest = 'Le titre de mon composant';

  public userList!: any;
  public userListHeaders!: string[];
  public demoDate = new Date();

  public stateOrder = StateOrder;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private store: Store
  ) { 
    this.headers = ["","", $localize `TjmHt`, $localize `NbJours`, $localize `TVA`, $localize `Total HT`, $localize `Total TTC`, $localize `Type Presta`, $localize `Client`, $localize `State`];
    this.collection$ = this.store.select(selectAllOrders);
    this.store.dispatch(getAllOrdersAction());
  }

  public total(val: number, coef: number, tva?: number): number {
    if(tva) {
      return val * coef * (1 + tva/100);
    } else {
      return val * coef;
    }
  }
  

  ngOnInit(): void {
  }

  public onChangeState(order: Order, event: any): void {
    this.ordersService.changeState(order, event.target.value).subscribe(
      (data: Order) => {
        order.state = data.state;
      }
    )
  }

  public onClickGoToEdit(order: Order): void {
    this.router.navigateByUrl(`/orders/edit/${order.id}`);
  }

  public onClickDelete(order: Order): void {
    console.log(order.id);
    //TODO  faire appel à notre service en souscrivant
    this.ordersService.deleteById(order.id).subscribe((resp) => {
      console.log("Suppression successful : ", resp);
    });
  }

  ngOnDestroy(): void {
    console.log('Instance detruite + desinscription');
    // this.subNumVersion.unsubscribe();
  }
}
