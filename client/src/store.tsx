import { createStore } from "redux";
import addToCart from "./reducers/addToCart";

const store = createStore(addToCart);

export default store;
