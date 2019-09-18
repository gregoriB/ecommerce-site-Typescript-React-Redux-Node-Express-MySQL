import { combineReducers } from "redux";

import products from "./products";
import searchRequest from "./searchRequest";
import filters from "./filters";
import userData from "./userData";
import shoppingCart from "./shoppingCart";
import toasts from "./toasts";
import windowSize from "./window";

export default combineReducers({
    products,
    searchRequest,
    filters,
    userData,
    shoppingCart,
    toasts,
    windowSize
});
