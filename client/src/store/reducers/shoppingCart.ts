// import { IAAdd } from "../../types/types";

interface IState {
    cart: {
        [key: string]: number;
    };
}

const initialState: any = {
    cart: {}
};

const shoppingCart = (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD_ONE_TO_CART":
            const product = state.cart[action.payload.name];
            return (state = {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload.name]: {
                        ...action.payload.attributes,
                        qty: (product && product.qty + 1) || 1
                    }
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
                    [action.payload.name]: {
                        ...state.cart[action.payload.name],
                        qty: action.payload.qty
                    }
                }
            });
        default:
            return state;
    }
};

export default shoppingCart;
