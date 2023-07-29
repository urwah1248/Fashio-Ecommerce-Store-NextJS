import { Dispatch } from "redux"
import { ActionTypes } from "../constants"

const AddToCartAction = (product: Dispatch<any>) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionTypes.ADD_TO_CART,
            payload: product
        })
    }
}

const RemoveFromCartAction = (product: Dispatch<any>) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionTypes.REMOVE_FROM_CART,
            payload: product
        })
    }
}

const CheckoutCartAction = () => {
    return (dispatch: any) => {        
        dispatch({
            type: ActionTypes.CHECKOUT_CART,
        })
    }
}
export {
    AddToCartAction,
    RemoveFromCartAction,
    CheckoutCartAction
}