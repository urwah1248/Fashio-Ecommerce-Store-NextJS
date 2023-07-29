import { ActionTypes } from "../constants";

const INITIAL_STATE = {
    cartItems: []
}

const AddAndRemoveToCartReducer  = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case ActionTypes.REMOVE_FROM_CART:
            const itemToRemove = state.cartItems.filter((product: any, index) => {
                return product !== action.payload
            })
            return {
                ...state,
                cartItems: [...itemToRemove]
            }
        case ActionTypes.CHECKOUT_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}



export {
    AddAndRemoveToCartReducer
}