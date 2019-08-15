export interface IActionPopulate {
    type: string;
    payload: any;
}

const populateProducts = (data: any): IActionPopulate => {
    return { type: "FEATURED", payload: data };
};

export default populateProducts;
