import { IAAdd, IAChangeFilter, IAPopulate, IAUpdateSearch, IUpdateUserData } from "../../types/types";

export const addLoginData = (data: any) => ({
    type: "ADD",
    payload: data
});

export const addToCart = (item: number): IAAdd => ({ type: "ADD", payload: item });

export const changeFilter = ({ type, payload }: IAChangeFilter): IAChangeFilter => ({ type, payload });

export const populateProducts = ({ type, payload }: IAPopulate): IAPopulate => ({ type, payload });

export const updateSearch = (payload: string): IAUpdateSearch => ({ type: "SEARCH REQUEST", payload });

export const updateUserData = ({ type, payload }: IUpdateUserData): IUpdateUserData => ({
    type,
    payload
});
