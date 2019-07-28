const addToCart = (
    state = {
        cart: 0
    },
    action: any
) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                cart: action.payload
            };
            break;
        default:
            break;
    }

    return state;
};

export default addToCart;
