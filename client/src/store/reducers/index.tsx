import { combineReducers } from "redux";
import products from "./products";
import loginData from "./loginData";
import searchRequest from "./searchRequest";
import filters from "./filters";

export default combineReducers({ products, loginData, searchRequest, filters });
