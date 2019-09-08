import { IProducts } from "./types";

export interface IAddProductPayload {
    itemName: string;
    attribute: {
        [key: string]: number;
    };
}

export interface IAddProductRtrn {
    type: string;
    payload: IAddProductPayload;
}

export interface IRemoveFromCartRtrn {
    type: string;
    payload: string;
}

export interface IUpdateCartQtyPayload {
    itemName: string;
    qty: number;
}

export interface IUpdateCartQtyRtrn {
    type: string;
    payload: IUpdateCartQtyPayload;
}

export interface IAddToastRtrn {
    type: string;
    payload: React.ReactChild;
}

export interface IRemoveToastRtrn {
    type: string;
}

export interface IChangeCategoriesInFilterRtn {
    type: string;
    payload: string[];
}

export interface IChangePriceRangeInFiltersRtn {
    type: string;
    payload: number[];
}

export interface IPopulateProductsRtn {
    type: string;
    payload: IProducts;
}

export interface IUpdateSearchRtn {
    type: string;
    payload: string;
}

export interface IUpdateUserDataPayload {
    userName: string;
    userEmail: string;
}

export interface IUpdateUserDataRtn {
    type: string;
    payload: IUpdateUserDataPayload;
}

export interface IDeleteUserRtn {
    type: string;
}
