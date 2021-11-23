import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorsReducer from "./errorsReducer";
import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import paymentsReducer from "./paymentsReducer";


export default combineReducers({
    userReducer,
    errorsReducer,
    categoriesReducer,
    productsReducer,
    cartReducer,
    paymentsReducer
})