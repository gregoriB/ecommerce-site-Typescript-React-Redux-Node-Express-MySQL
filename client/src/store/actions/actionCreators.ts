import { IAChangeFilter, IAPopulate, IAUpdateSearch, IUpdateUserData } from "../../types/types";

export const addLoginData = (data: any) => ({
    type: "ADD",
    payload: data
});

export const addOneToCart = (payload: any): any => ({ type: "ADD_ONE_TO_CART", payload });
export const removeFromCart = (payload: any): any => ({ type: "REMOVE_FROM_CART", payload });
export const updateQuantity = (payload: any): any => ({ type: "UPDATE_QUANTITY", payload });

export const addToast = (payload: any): any => ({ type: "ADD_TOAST", payload });
export const removeToast = (): any => ({ type: "REMOVE_TOAST" });

export const changeFilter = ({ type, payload }: any): any => ({ type, payload });

export const populateProducts = ({ type, payload }: any): any => ({ type, payload });

export const updateSearch = (payload: any): any => ({ type: "SEARCH REQUEST", payload });

export const updateUserData = ({ type, payload }: any): any => ({
    type,
    payload
});
