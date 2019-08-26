import { IData } from "../../types/types";

export interface IActionPopulate {
    type: string;
    payload: IData[];
}

const populateProducts = ({ type, payload }: any) => {
    return { type, payload };
};

export default populateProducts;
