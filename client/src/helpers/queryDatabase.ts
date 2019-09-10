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
    const response = await fetch(`http://localhost:34567/${path}`, options);
    const results = await response.json();
    return results;
};

export default queryDatabase;
