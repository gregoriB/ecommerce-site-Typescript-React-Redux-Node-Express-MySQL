const initialState: any = {
    query: ""
};

export default function searchRequest(state = initialState, action: any) {
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
