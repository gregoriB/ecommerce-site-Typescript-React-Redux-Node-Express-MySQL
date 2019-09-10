import { IShoppingCart } from "../../types/types";
import { IShoppingCartRtn } from "../../types/actionTypes";

const initialState: IShoppingCart = {};

const shoppingCart = (state = initialState, action: IShoppingCartRtn) => {
    switch (action.type) {
        case "ADD_ONE_TO_CART":
            const product = state[action.payload.itemName];
            return (state = {
                ...state,
                [action.payload.itemName]: {
                    ...action.payload.attributes,
                    qty: (product && product.qty && product.qty + 1) || 1
                }
            });
        case "REMOVE_FROM_CART":
            const newCart = Object.keys(state)
                .filter(key => key !== action.payload.itemName)
                .reduce((result: IShoppingCart, current: string) => {
                    result[current] = state[current];
                    return result;
                }, {});
            return (state = newCart);

        case "UPDATE_QUANTITY":
            return (state = {
                ...state,
                [action.payload.itemName]: {
                    ...state[action.payload.itemName],
                    qty: action.payload.qty
                }
            });
        default:
            return state;
    }
};

export default shoppingCart;
