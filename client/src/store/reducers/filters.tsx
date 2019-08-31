interface IState {
    allCategories: string[];
    selectedCategories: string[];
    priceRange: any;
}

const initialState: IState = {
    allCategories: [],
    selectedCategories: [],
    priceRange: [undefined, undefined]
};

export default function loginData(state = initialState, action: any) {
    switch (action.type) {
        case "NEW_CATEGORIES":
            return (state = {
                ...state,
                allCategories: action.payload
            });
        case "SELECTED_CATEGORIES":
            return (state = {
                ...state,
                selectedCategories: action.payload
            });
        case "PRICE_RANGE":
            return (state = {
                ...state,
                priceRange: action.payload
            });
        default:
            return state;
    }
}
