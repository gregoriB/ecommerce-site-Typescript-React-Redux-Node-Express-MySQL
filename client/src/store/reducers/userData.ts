import { IUpdateUserDataRtn } from "../../types/actionTypes";

interface IInitialState {
    [key: string]: string;
}

const initialState: IInitialState = {
    username: "",
    email: ""
};

export default function userData(state = initialState, action: IUpdateUserDataRtn) {
    switch (action.type) {
        case "UPDATE_USER_DATA":
            if (!action.payload) return state;
            const { username, email } = action.payload;
            return (state = {
                ...state,
                username,
                email
            });
        case "DELETE_USER_DATA":
            return (state = initialState);
        default:
            return state;
    }
}
