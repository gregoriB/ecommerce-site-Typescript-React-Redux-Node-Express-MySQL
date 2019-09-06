import { IAChangeFilter, IAPopulate, IAUpdateSearch, IUpdateUserData } from "../../types/types";

export const addLoginData = (data: any) => ({
    type: "ADD",
    payload: data
});

export const addOneToCart = (payload: number): any => ({ type: "ADD_ONE_TO_CART", payload });
export const removeAllFromCart = (payload: number): any => ({ type: "REMOVE_FROM_CART", payload });
export const updateQuantity = (payload: any): any => ({ type: "UPDATE_QUANTITY", payload });

export const changeFilter = ({ type, payload }: IAChangeFilter): IAChangeFilter => ({ type, payload });

export const populateProducts = ({ type, payload }: IAPopulate): IAPopulate => ({ type, payload });

export const updateSearch = (payload: string): IAUpdateSearch => ({ type: "SEARCH REQUEST", payload });

export const updateUserData = ({ type, payload }: IUpdateUserData): IUpdateUserData => ({
    type,
    payload
});
