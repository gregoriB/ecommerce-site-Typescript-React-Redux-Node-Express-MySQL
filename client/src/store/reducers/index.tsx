import { combineReducers } from "redux";
import products from "./products";
import loginData from "./loginData";
import searchRequest from "./searchRequest";

export default combineReducers({ products, loginData, searchRequest });
