interface initialState {
    windowWidth: number;
}

const initialState: initialState = {
    windowWidth: window.innerWidth
};

type action = { type: string };

export default function windowSize(state = initialState, action: action) {
    switch (action.type) {
        case "UPDATE_WINDOW_WIDTH":
            return (state = {
                windowWidth: window.innerWidth
            });
        default:
            return state;
    }
}
