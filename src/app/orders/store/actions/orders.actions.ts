import { createAction, props } from "@ngrx/store";
import { Order } from "src/app/core/models/order";

export const getAllOrdersAction = createAction(
    '[Orders] get all orders'
)

export const getAllOrdersActionSuccess = createAction(
    '[Orders] get all orders success', props<{orders: Order[]}>()
)

export const getAllOrdersActionFailure = createAction(
    '[Orders] get all orders failure'
)