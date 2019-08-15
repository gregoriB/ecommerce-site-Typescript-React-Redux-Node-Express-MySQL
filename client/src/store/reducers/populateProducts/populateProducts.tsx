import { IActionPopulate } from "../../actions/populateProducts";

export interface IState {
    featured: any;
}

const initialState: IState = {
    featured: []
};

const populateProducts = (state = initialState, action: IActionPopulate) => {
    switch (action.type) {
        case "FEATURED":
            state = {
                ...state,
                featured: action.payload
            };
            break;
        default:
            break;
    }

    return state;
};

export default populateProducts;
