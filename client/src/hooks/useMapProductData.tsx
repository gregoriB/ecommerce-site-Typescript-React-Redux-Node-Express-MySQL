import React, { useState, useEffect } from "react";
import Components from "../helpers/Components";

const useMapProductData = (props: any) => {
    const [products, setProducts] = useState();
    useEffect(() => {
        if (products || !props.products) return;
        const Component = Components[props.type];
        setProducts(
            props.products.map((item: any, index: number) => {
                return (
                    <Component
                        key={index}
                        index={index}
                        image={item.imageURL}
                        title={item.name}
                        desc={item.shortDescription}
                        descLong={item.longDescription}
                        price={item.price}
                    />
                );
            })
        );
    });
    return products;
};

export default useMapProductData;
