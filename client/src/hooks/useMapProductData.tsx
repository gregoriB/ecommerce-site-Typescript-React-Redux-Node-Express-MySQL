import React, { useState, useEffect } from "react";
import Components from "../helpers/Components";

interface IData {
    imageURL: string;
    name: string;
    descShort: string;
    descLong: string;
    price: number;
}

interface IProps {
    type: string;
    products: IData[];
}

const useMapProductData = ({ type, products }: IProps) => {
    const [mapped, setMapped] = useState();
    useEffect(() => {
        if (mapped || !products || products.length < 1) {
            return;
        }
        const Component = Components[type];
        console.log("mapped");
        setMapped(
            products.map((item: IData, index: number) => (
                <Component
                    key={index}
                    index={index}
                    imageURL={item.imageURL}
                    name={item.name}
                    descShort={item.descShort}
                    descLong={item.descLong}
                    price={item.price}
                />
            ))
        );
    }, [mapped, setMapped, type, products]);

    return mapped;
};

export default useMapProductData;
