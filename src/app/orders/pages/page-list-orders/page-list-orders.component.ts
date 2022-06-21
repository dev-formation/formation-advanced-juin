import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, pluck, Subject, Subscription, tap } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { VersionService } from 'src/app/core/services/version.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss']
})
export class PageListOrdersComponent implements OnInit, OnDestroy {
  public titleParent = 'Liste de commandes';
  // public collection!: Order[];
  // public collection$: Observable<Order[]>;
  public subCollection$: Subject<Order[]>;
  public numVersion$: BehaviorSubject<number>;
  public headers: string[];
  public collection!: Order[]; 

  public titleTest = 'Le titre de mon composant';

  public userList!: any;
  public userListHeaders!: string[];
  public demoDate = new Date();

  public stateOrder = StateOrder;
  
  private count = 0;
  private subscription: Subscription;
  // private subNumVersion: Subscription;

  constructor(
    private ordersService: OrdersService,
    private versionService: VersionService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.headers = ["","", $localize `TjmHt`, $localize `NbJours`, $localize `TVA`, $localize `Total HT`, $localize `Total TTC`, $localize `Type Presta`, $localize `Client`, $localize `State`];
    
    // this.collection$ = this.ordersService.collection$;
    this.subCollection$ = this.ordersService.subCollection$;
    this.subscription = this.subCollection$.subscribe(
      (listOrder: Order[]) => this.collection = [...listOrder]
    )
    //this.ordersService.refreshCollection();

    this.route.data.pipe(
      tap((data) => console.log(data)),//{ preload: true, orders: (8) […] }
      pluck('orders') // je recupère simplement la propriété orders de mon objet data => (8) […]
    ).subscribe(
      (listOrder: Order[]) => this.collection = [...listOrder]
    )


    // this.ordersService.collection$.subscribe({
    //     next: (data) => { 
    //       console.log('Next : ', data);
    //       this.collection = data;
    //     },
    //     error: (err) => { console.error('Error : ', err)},
    //     complete: () => { console.info('Fin de transmission')}
    //   })
      
      // this.subNumVersion = this.versionService.numVersion$.subscribe(versionNum => console.warn("**** Num Version"))
      this.numVersion$ = this.versionService.numVersion$;
  }

  public total(val: number, coef: number, tva?: number): number {
    this.count++;
    console.warn(this.count);
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
    // redirection vers une url du type /orders/edit/order.id
    // this.router.navigate(['orders', 'edit', order.id]);
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
    this.subscription.unsubscribe();
  }
}
