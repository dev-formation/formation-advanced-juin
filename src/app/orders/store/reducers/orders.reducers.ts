import { createReducer, on } from "@ngrx/store";
import { Order } from "src/app/core/models/order";
import { getAllOrdersActionSuccess } from "../actions/orders.actions";

export interface OrdersState {
    orders: Order[],
    error: any,
    selectedOrder: Order | null
}

export const initialOrdersState: OrdersState = {
    orders: [],
    error: null,
    selectedOrder: null
}

/* 
    permet de venir référencer 
    les feature dont on a besoin 
    au niveau de nos modules
*/
export const ordersFeatureKey = "orders";

export const orderReducer = createReducer(
    initialOrdersState,
    on(
        getAllOrdersActionSuccess,
        (state: OrdersState, { orders } : { orders: Order[]}) => {
            return {
                ...state,
                orders: [...orders]
            }
        }
    )
)
