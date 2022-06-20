import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { VersionService } from 'src/app/core/services/version.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss']
})
export class PageListOrdersComponent implements OnInit {
  public titleParent = 'Liste de commandes';
  // public collection!: Order[];
  // public collection$: Observable<Order[]>;
  public subCollection$: Subject<Order[]>;
  public numVersion$: BehaviorSubject<number>;
  public headers!: string[];

  public titleTest = 'Le titre de mon composant';

  public userList!: any;
  public userListHeaders!: string[];
  public demoDate = new Date();

  public stateOrder = StateOrder;
  
  private count = 0;
  // private subNumVersion: Subscription;

  constructor(
    private ordersService: OrdersService,
    private versionService: VersionService,
    private router: Router,
    private translate: TranslateService) { 
      this.translate.onLangChange.pipe(
        switchMap(() => {
          return this.getHeadersTranslation()}
        )
      ).subscribe( (tabHeader: string[]) => {
        console.log(tabHeader);
        this.headers = ["", "",...tabHeader];
      })
    // this.headers = ["","", "TjmHt", "NbJours", "TVA", "Total HT", "Total TTC", "Type Presta", "Client", "State"];
    
    
    // this.collection$ = this.ordersService.collection$;
    this.subCollection$ = this.ordersService.subCollection$;
    this.ordersService.refreshCollection();

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
    this.getHeadersTranslation().subscribe( (tabHeader: string[]) => {
      console.log(tabHeader);
      this.headers = ["", "",...tabHeader];
    })
  }

  private getHeadersTranslation() {
    return forkJoin(
      [
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.DAILY_RATE'),
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.DAYS'),
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.VAT'),
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.TOTAL_TAX_FREE'),
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.TOTAL_TAX_INCL'),
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.SERVICE_TYPE'),
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.CUSTOMER'),
        this.translate.get('PAGE.LIST_ORDERS.TABLE.HEADER.STATE')
      ]
    )
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
  }
}
