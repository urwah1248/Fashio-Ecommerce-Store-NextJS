import { ActionTypes } from "../constants";

const INITIAL_STATE = {
    cartItems: []
}

const AddToCartReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        default:
            return state;
    }
}


const RemoveFromCartReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.REMOVE_FROM_CART:
            const itemToRemove = state.cartItems.filter((product: any) => {
                return product.id !== action.payload.id
            })
            return {
                ...state,
                cartItems: [...itemToRemove]
            }
        default:
            return state;
    }
}

export {
    AddToCartReducer, RemoveFromCartReducer
}