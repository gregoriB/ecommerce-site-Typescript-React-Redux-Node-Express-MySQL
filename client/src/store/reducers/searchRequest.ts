import { IUpdateSearchRtn } from "../../types/actionTypes";

interface IInitialState {
    query: string;
}

const initialState: IInitialState = {
    query: ""
};

export default function searchRequest(state = initialState, action: IUpdateSearchRtn) {
    switch (action.type) {
        case "SEARCH_REQUEST":
            return (state = {
                ...state,
                query: action.payload
            });
        default:
            return state;
    }
}
