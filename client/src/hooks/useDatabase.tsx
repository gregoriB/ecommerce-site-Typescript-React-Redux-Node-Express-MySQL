import { useState, useEffect } from "react";

const useDatabase = (path: string) => {
    const [queryData, setQueryData] = useState();
    useEffect(() => {
        if (queryData) {
            return;
        }
        (async () => {
            try {
                const response = await fetch(`http://localhost:34567/${path}`);
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
