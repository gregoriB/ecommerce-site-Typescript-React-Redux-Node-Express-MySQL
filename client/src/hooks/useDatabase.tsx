import { useState, useEffect } from "react";

interface IProps {
    path: string;
    query: string;
}

const useDatabase = ({ path, query }: IProps) => {
    const [queryData, setQueryData] = useState();
    useEffect(() => {
        if (queryData) {
            return;
        }
        const options = {
            method: "POST",
            body: JSON.stringify({ query }),
            headers: { "Content-Type": "applications/json" }
        };
        console.log("DB queried");
        (async () => {
            try {
                const response = await fetch(`http://localhost:34567/${path}`, options);
                const results = await response.json();
                setQueryData(results);
            } catch (err) {
                console.error(err);
            }
        })();
    });
    return queryData;
};

export default useDatabase;
