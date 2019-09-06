// import { IAAdd } from "../../types/types";

interface IState {
    cart: {
        [key: string]: number;
    };
}

const initialState: IState = {
    cart: {}
};

const shoppingCart = (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD_ONE_TO_CART":
            return (state = {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload]: state.cart[action.payload] + 1 || 1
                }
            });
        case "REMOVE_FROM_CART":
            const newCart = Object.keys(state.cart)
                .filter(key => key !== action.payload)
                .reduce((result: any, current: string) => {
                    result[current] = state.cart[current];
                    return result;
                }, {});
            return (state = {
                ...state,
                cart: newCart
            });

        case "UPDATE_QUANTITY":
            return (state = {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload.item]: action.payload.quantity
                }
            });
        default:
            return state;
    }
};

export default shoppingCart;
