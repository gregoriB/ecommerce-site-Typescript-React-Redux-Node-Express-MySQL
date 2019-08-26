export interface IActionChangeCategories {
    type: string;
    payload: string[];
}

const changeCategories = ({ type, payload }: any): IActionChangeCategories => {
    return { type, payload };
};

export default changeCategories;
