import { IActionPopulate } from "../../actions/populateProducts";
import { IData } from "../../../types/types";

export interface IState {
    [key: string]: IData[];
}

const initialState: IState = {
    featured: [],
    SearchResults: []
};

const populateProducts = (state = initialState, action: IActionPopulate) => {
    switch (action.type) {
        case "FEATURED":
            state = {
                ...state,
                featured: action.payload
            };
            break;
        case "SEARCH":
            state = {
                ...state,
                searchResults: action.payload
            };
            break;
        default:
            break;
    }

    return state;
};

export default populateProducts;
