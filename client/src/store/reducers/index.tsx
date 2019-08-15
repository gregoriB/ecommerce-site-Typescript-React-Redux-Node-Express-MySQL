import { combineReducers } from "redux";
import populateProducts from "./populateProducts/populateProducts";

const rootReducer = combineReducers({ populateProducts });

export default rootReducer;
