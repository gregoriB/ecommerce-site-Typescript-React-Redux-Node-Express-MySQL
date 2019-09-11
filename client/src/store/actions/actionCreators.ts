import { IProduct, IUserData } from "../../types/generalTypes";
import * as AT from "../../types/actionTypes";

//shopping cart
export const addOneToCart = (payload: AT.IShoppingCartPayload): AT.IShoppingCartRtn => ({
    type: "ADD_ONE_TO_CART",
    payload
});
export const removeFromCart = (payload: AT.IShoppingCartPayload): AT.IShoppingCartRtn => ({
    type: "REMOVE_FROM_CART",
    payload
});
export const updateQuantityInCart = (payload: AT.IShoppingCartPayload): AT.IShoppingCartRtn => ({
    type: "UPDATE_QUANTITY",
    payload
});

//toasts
export const addToast = (payload: React.ReactChild): AT.IChangeToastRtn => ({
    type: "ADD_TOAST",
    payload
});
export const removeToast = (): AT.IChangeToastRtn => ({ type: "REMOVE_TOAST" });

//filters
export const addCategoriesToFilter = (payload: string[]): AT.IFiltersRtn => ({
    type: "NEW_CATEGORIES",
    payload
});
export const changeCategoriesInFilter = (payload: string[]): AT.IFiltersRtn => ({
    type: "SELECTED_CATEGORIES",
    payload
});
export const changePriceRangeInFilter = (payload: number[]): AT.IFiltersRtn => ({
    type: "PRICE_RANGE",
    payload
});

//products
export const populateFeaturedProducts = (payload: IProduct[]): AT.IPopulateProductsRtn => ({
    type: "FEATURED_RESULTS",
    payload
});
export const populateSearchProducts = (payload: IProduct[]): AT.IPopulateProductsRtn => ({
    type: "SEARCH_RESULTS",
    payload
});

//searches
export const updateSearch = (payload: string): AT.IUpdateSearchRtn => ({
    type: "SEARCH_REQUEST",
    payload
});

//users
export const updateUserData = (payload: IUserData): AT.IUpdateUserDataRtn => ({
    type: "UPDATE_USER_DATA",
    payload
});
export const deleteUserData = (): AT.IUpdateUserDataRtn => ({ type: "DELETE_USER_DATA" });

//window resizing
export const updateWindowWidth = () => ({ type: "UPDATE_WINDOW_WIDTH" });
