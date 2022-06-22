import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { getAllOrdersAction, getAllOrdersActionFailure, getAllOrdersActionSuccess } from "../actions/orders.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { OrdersService } from "../../services/orders.service";
import { Order } from "src/app/core/models/order";

@Injectable()
export class OrdersEffects {
    constructor(
        private actions$: Actions,
        private ordersService: OrdersService
    ) {}

    getAllOrdersEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAllOrdersAction),
            switchMap(() => {
                return this.ordersService.loadOrders().pipe(
                    map((orders: Order[]) => getAllOrdersActionSuccess({orders: orders})),
                    catchError( () => of(getAllOrdersActionFailure()))
                )
            })
        )
    })
}