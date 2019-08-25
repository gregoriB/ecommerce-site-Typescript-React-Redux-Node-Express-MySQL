import { IActionPopulate } from "../actions/populateProducts";
import { IData } from "../../types/types";

export interface IState {
    [key: string]: IData[];
}

const initialState: IState = {
    featured: [],
    SearchResults: []
};

export default function products(state = initialState, action: IActionPopulate) {
    switch (action.type) {
        case "FEATURED RESULTS":
            return (state = {
                ...state,
                featured: action.payload
            });
        case "SEARCH RESULTS":
            return (state = {
                ...state,
                searchResults: action.payload
            });
        default:
            console.log(state.searchResults);
            return state;
    }
}
