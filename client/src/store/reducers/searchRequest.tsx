import { IAUpdateSearch } from "../../types/types";

interface IState {
    query: string;
}

const initialState: IState = {
    query: ""
};

export default function searchRequest(state = initialState, action: any) {
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
