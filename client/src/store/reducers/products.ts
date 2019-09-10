import { IProduct } from "../../types/generalTypes";
import { IPopulateProductsRtn } from "../../types/actionTypes";

interface initialState {
    featured: IProduct[];
    searchResults: IProduct[];
}

const initialState: initialState = {
    featured: [],
    searchResults: []
};

export default function products(state = initialState, action: IPopulateProductsRtn) {
    switch (action.type) {
        case "FEATURED_RESULTS":
            return (state = {
                ...state,
                featured: action.payload
            });
        case "SEARCH_RESULTS":
            return (state = {
                ...state,
                searchResults: action.payload
            });
        default:
            return state;
    }
}
