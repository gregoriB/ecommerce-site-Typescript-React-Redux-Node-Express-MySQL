const addToCart = (
    state = {
        cart: {} as any,
        productArr: [] as number[]
    },
    action: any
) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload]: state.cart[action.payload] + 1 || 1
                },
                productArr: [...state.productArr, action.payload]
            };
            break;
        default:
            break;
    }

    return state;
};

export default addToCart;
