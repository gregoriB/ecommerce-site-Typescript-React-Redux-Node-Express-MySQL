import { IAAdd, IAChangeFilter, IAPopulate, IAUpdateSearch } from "../../types/types";

export const addLoginData = (data: any) => {
    return {
        type: "ADD",
        payload: data
    };
};

export const addToCart = (item: number): IAAdd => {
    return { type: "ADD", payload: item };
};

export const changeFilter = ({ type, payload }: IAChangeFilter): IAChangeFilter => {
    return { type, payload };
};

export const populateProducts = ({ type, payload }: IAPopulate) => {
    return { type, payload };
};

export const updateSearch = (payload: string): IAUpdateSearch => {
    return { type: "SEARCH REQUEST", payload };
};
