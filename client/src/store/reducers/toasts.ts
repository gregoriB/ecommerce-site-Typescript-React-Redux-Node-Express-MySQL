interface IState {
    toastArr: string[];
}

const initialState: any = {
    toastArr: []
};

export default function toasts(state = initialState, action: any) {
    switch (action.type) {
        case "ADD_TOAST":
            const addToastArr = [...state.toastArr];
            addToastArr.push(action.payload);
            return (state = {
                ...state,
                toastArr: addToastArr
            });
        case "REMOVE_TOAST":
            const removeToastArr = state.toastArr.slice(1);
            return (state = {
                ...state,
                toastArr: removeToastArr
            });
        default:
            return state;
    }
}
