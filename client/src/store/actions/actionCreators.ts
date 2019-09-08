import { IProducts } from "../../types/types";
import * as AT from "../../types/actionTypes";

//shopping cart
export const addOneToCart = (payload: AT.IAddProductPayload): AT.IAddProductRtrn => ({
    type: "ADD_ONE_TO_CART",
    payload
});
export const removeFromCart = (payload: string): AT.IRemoveFromCartRtrn => ({
    type: "REMOVE_FROM_CART",
    payload
});
export const updateQuantityInCart = (payload: AT.IUpdateCartQtyPayload): AT.IUpdateCartQtyRtrn => ({
    type: "UPDATE_QUANTITY",
    payload
});

//toasts
export const addToast = (payload: React.ReactChild): AT.IAddToastRtrn => ({
    type: "ADD_TOAST",
    payload
});
export const removeToast = (): AT.IRemoveToastRtrn => ({ type: "REMOVE_TOAST" });

//filters
export const addCategoriesToFilter = (payload: string[]): AT.IChangeCategoriesInFilterRtn => ({
    type: "NEW_CATEGORIES",
    payload
});
export const changeCategoriesInFilter = (payload: string[]): AT.IChangeCategoriesInFilterRtn => ({
    type: "SELECTED_CATEGORIES",
    payload
});
export const changePriceRangeInFilter = (payload: number[]): AT.IChangePriceRangeInFiltersRtn => ({
    type: "PRICE_RANGE",
    payload
});

//products
export const populateFeaturedProducts = (payload: IProducts): AT.IPopulateProductsRtn => ({
    type: "FEATURED_RESULTS",
    payload
});
export const populateSearchProducts = (payload: IProducts): AT.IPopulateProductsRtn => ({
    type: "SEARCH_RESULTS",
    payload
});

//searches
export const updateSearch = (payload: string): AT.IUpdateSearchRtn => ({
    type: "SEARCH_REQUEST",
    payload
});

//users
export const updateUserData = (payload: AT.IUpdateUserDataPayload): AT.IUpdateUserDataRtn => ({
    type: "UPDATE_USER_DATA",
    payload
});
export const deleteUserData = (): AT.IDeleteUserRtn => ({ type: "DELETE_USER_DATA" });
