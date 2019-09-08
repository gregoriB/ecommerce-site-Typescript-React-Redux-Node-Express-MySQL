const initialState: any = {
    name: "",
    email: ""
};

export default function userData(state = initialState, action: any) {
    switch (action.type) {
        case "UPDATE_USER_DATA":
            const { userName, email } = action.payload;
            return (state = {
                ...state,
                name: userName,
                email
            });
        case "DELETE_USER_DATA":
            return (state = initialState);
        default:
            return state;
    }
}
