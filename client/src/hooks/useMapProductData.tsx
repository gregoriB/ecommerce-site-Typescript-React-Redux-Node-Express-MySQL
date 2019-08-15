import React, { useState, useEffect } from "react";
import Components from "../helpers/Components";

const useMapProductData = (props: any) => {
    const [mapped, setMapped] = useState();
    const { type, products } = props;
    useEffect(() => {
        if (mapped || !products || products.length < 1) return;
        const Component = Components[type];
        setMapped(
            products.map((item: any, index: number) => (
                <Component
                    key={index}
                    index={index}
                    image={item.imageURL}
                    title={item.name}
                    desc={item.shortDescription}
                    descLong={item.longDescription}
                    price={item.price}
                />
            ))
        );
    }, [mapped, setMapped, type, products, props]);

    return mapped && mapped.length > 0 ? mapped : null;
};

export default useMapProductData;
