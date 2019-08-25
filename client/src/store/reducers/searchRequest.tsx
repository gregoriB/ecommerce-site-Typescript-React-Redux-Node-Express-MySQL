import { IActionPopulate } from "../actions/populateProducts";
import { IData } from "../../types/types";

export interface IState {
    [key: string]: IData[];
}

const initialState: any = {
    query: ""
};

export default function searchRequest(state = initialState, action: IActionPopulate) {
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
