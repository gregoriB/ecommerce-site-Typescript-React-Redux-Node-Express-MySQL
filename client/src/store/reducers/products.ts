import { IData, IAPopulate } from "../../types/types";

export interface IState {
    [key: string]: IData[];
}

const initialState: IState = {
    featured: [],
    SearchResults: []
};

export default function products(state = initialState, action: any) {
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
            return state;
    }
}
