export const addToCart = (item: number): any => {
    return {
        type: "ADD",
        payload: item
    };
};
