export interface IActionchangeFilter {
    type: string;
    payload: any;
}

const changeFilter = ({ type, payload }: any): IActionchangeFilter => {
    return { type, payload };
};

export default changeFilter;
