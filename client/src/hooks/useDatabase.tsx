import { useState, useEffect } from "react";

const useDatabase = (props: string) => {
    const [queryData, setQueryData] = useState(null);
    useEffect(() => {
        if (queryData) return;
        (async (path: string) => {
            try {
                const response = await fetch(`http://localhost:34567/${path}`);
                const results: any = await response.json();
                setQueryData(results);
            } catch (err) {
                console.error(err);
            }
        })(props);
    });
    return queryData;
};

export default useDatabase;
