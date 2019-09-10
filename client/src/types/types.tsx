export interface IProduct {
    imageURL?: string;
    itemName: string;
    price: number;
    descShort: string;
    descLong: string;
    stock: number;
    length: number;
    index: number;
    category: string;
}

export interface IQueryDBArgs {
    path: string;
    query?: { [key: string]: string };
    method?: string;
}

export interface IUserData {
    username: string;
    email: string;
}

export interface IFilters {
    selectedCategories: string[];
    allCategories: string[];
    priceRange: number[] | undefined[];
}

export interface IShoppingCartItems {
    price?: number;
    stock?: number;
    qty?: number;
}

export interface IShoppingCart {
    [key: string]: IShoppingCartItems;
}
