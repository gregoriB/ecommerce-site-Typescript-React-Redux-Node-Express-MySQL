const initialState: any = {
    featured: [],
    SearchResults: []
};

export default function products(state = initialState, action: any) {
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
