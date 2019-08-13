import React, { useEffect, useState } from "react";
import Toast from "../components/Toast";

const useMapToasts = (props: any) => {
    const [activeToasts, setActiveToasts] = useState<any>([]);
    console.log(props);
    useEffect(() => {
        props.productArr &&
            setActiveToasts(
                props.productArr.map((item: number, index: number) => (
                    <Toast item={Number(item)} key={index} />
                ))
            );
    }, [props.productArr]);
    console.log(props.productArr);
    return activeToasts;
};

export default useMapToasts;
