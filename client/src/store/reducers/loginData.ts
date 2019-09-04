const initialState = {
    data: []
};

export default function loginData(state = initialState, action: any) {
    switch (action.type) {
        case "ADD":
            return (state = {
                ...state,
                data: action.payload
            });
        default:
            return state;
    }
}
