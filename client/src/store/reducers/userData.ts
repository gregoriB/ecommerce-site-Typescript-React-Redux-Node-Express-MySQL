import { IUpdateUserData } from "../../types/types";

interface IState {
    [key: string]: string;
}

const initialState: IState = {
    name: "",
    email: ""
};

export default function userData(state = initialState, action: IUpdateUserData) {
    switch (action.type) {
        case "UPDATE_USER_DATA":
            const { name, email } = action.payload;
            return (state = {
                ...state,
                name,
                email
            });
        case "DELETE_USER_DATA":
            return (state = initialState);
        default:
            return state;
    }
}
