import { combineReducers } from "redux";
import addToCart from "./addToCart/addToCart";
import populateProducts from "./populateProducts/populateProducts";

const rootReducer = combineReducers({ addToCart, populateProducts });

export default rootReducer;
