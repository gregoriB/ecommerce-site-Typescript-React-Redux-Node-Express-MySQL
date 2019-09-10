import { IChangeToastRtn } from "../../types/actionTypes";

const initialState: React.ReactChild[] = [];

export default function toasts(state = initialState, action: IChangeToastRtn) {
    switch (action.type) {
        case "ADD_TOAST":
            if (!action.payload) return state;
            const addToastArr = [...state];
            addToastArr.push(action.payload);
            return (state = addToastArr);
        case "REMOVE_TOAST":
            const removeToastArr = state.slice(1);
            return (state = removeToastArr);
        default:
            return state;
    }
}
