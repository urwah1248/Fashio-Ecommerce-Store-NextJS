

import { combineReducers } from "redux";
import {
    AddToCartReducer,
    RemoveFromCartReducer
} from './ProductReducer'

const combineReducer = combineReducers({
    AddToCartReducer,
    RemoveFromCartReducer
})
export default combineReducer