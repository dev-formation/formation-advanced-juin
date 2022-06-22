import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';
import { editOrderAction } from '../../store/actions/orders.actions';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss']
})
export class PageEditOrderComponent implements OnInit {
  public orderToEdit$!: Observable<Order>; // Version avec pipe async 
  public orderToEdit!: Order; // Version avec subscribe

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router,
    private store: Store
  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const orderId = Number(params.get('id'));
      console.log(orderId);
      this.ordersService.getById(orderId).subscribe((order: Order) => {
        this.orderToEdit = new Order(order);
      });
    })

   }

  ngOnInit(): void {
  }

  public onSubmitUpdateOrder(submittedOrder: Order): void {
   this.store.dispatch(editOrderAction({orderToUpdate: submittedOrder}))
  }

}
