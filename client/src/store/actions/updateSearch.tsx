export interface IActionUpdateSearch {
    type: string;
    payload: string;
}

const updateSearch = (payload: string) => {
    return { type: "SEARCH REQUEST", payload };
};

export default updateSearch;
