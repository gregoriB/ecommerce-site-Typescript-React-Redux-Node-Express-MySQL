export interface IActionAdd {
    type: string;
    payload: number;
}

export const addToCart = (item: number): IActionAdd => {
    return { type: "ADD", payload: item };
};
