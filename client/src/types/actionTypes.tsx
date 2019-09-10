import { IProduct, IUserData } from "./types";

export interface IShoppingCartPayload {
    itemName: string;
    attributes?: {
        [key: string]: number;
    };
    qty?: number;
    price?: number;
}

export interface IShoppingCartRtn {
    type: string;
    payload: IShoppingCartPayload;
}

export interface IChangeToastRtn {
    type: string;
    payload?: React.ReactChild;
}

export interface IPopulateProductsRtn {
    type: string;
    payload: IProduct[];
}

export interface IUpdateSearchRtn {
    type: string;
    payload: string;
}
export interface IUpdateUserDataRtn {
    type: string;
    payload?: IUserData;
}

export interface IFiltersRtn {
    type: string;
    payload: number[] | string[];
}
