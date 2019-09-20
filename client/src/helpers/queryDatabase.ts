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

    //determine if deployed to heroku or local
    const server = process.env.NODE_ENV === "production" ? "" : "http://localhost:34567";
    const response = await fetch(`${server}/${path}`, options);
    const data = await response.json();
    return data.rows.length ? data.rows : data;
};

export default queryDatabase;
