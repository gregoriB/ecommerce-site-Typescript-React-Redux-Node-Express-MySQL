import { IQueryDBArgs } from "../types/generalTypes";

const queryDatabase = async ({ path, query, method }: IQueryDBArgs): Promise<any> => {
    let options;
    if (method) {
        options = {
            method,
            body: JSON.stringify(query),
            headers: { "Content-Type": "applications/json" }
        };
    }
    const response = await fetch(`https://super-meter-arcade.herokuapp.com/${path}`, options);
    const data = await response.json();
    return data.rows.length ? data.rows : data;
};

export default queryDatabase;
