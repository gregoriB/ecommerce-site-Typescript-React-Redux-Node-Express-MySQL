const initialState: any = {
    allCategories: [],
    selectedCategories: [],
    priceRange: [undefined, undefined]
};

export default function filters(state = initialState, action: any) {
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
