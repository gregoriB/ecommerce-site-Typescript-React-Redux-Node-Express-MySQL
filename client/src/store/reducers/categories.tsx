interface IState {
    allCategories: string[];
    selectedCategories: string[];
}

const initialState: IState = {
    allCategories: [],
    selectedCategories: []
};

export default function loginData(state = initialState, action: any) {
    switch (action.type) {
        case "NEW CATEGORIES":
            return (state = {
                ...state,
                allCategories: action.payload
            });
        case "SELECTED CATEGORIES":
            return (state = {
                ...state,
                selectedCategories: action.payload
            });
        default:
            return state;
    }
}
