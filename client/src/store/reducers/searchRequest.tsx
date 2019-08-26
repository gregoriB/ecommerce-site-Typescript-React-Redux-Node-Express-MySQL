import { IActionUpdateSearch } from "../actions/updateSearch";

export interface IState {
    query: string;
}

const initialState: IState = {
    query: ""
};

export default function searchRequest(state = initialState, action: IActionUpdateSearch) {
    switch (action.type) {
        case "SEARCH REQUEST":
            return (state = {
                ...state,
                query: action.payload
            });
        default:
            return state;
    }
}
