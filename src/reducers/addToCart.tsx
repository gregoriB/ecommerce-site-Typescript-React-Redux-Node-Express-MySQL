const addToCart = (
    state = {
        cart: [] as number[]
    },
    action: any
) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                cart: [...state.cart, action.payload]
            };
            break;
        default:
            break;
    }

    return state;
};

export default addToCart;
