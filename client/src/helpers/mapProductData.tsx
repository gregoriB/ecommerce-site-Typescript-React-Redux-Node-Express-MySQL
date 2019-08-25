import Components from "../helpers/Components";
import React from "react";

interface IData {
    imageURL: string;
    name: string;
    descShort: string;
    descLong: string;
    price: number;
}

interface IArgs {
    type: string;
    products: IData[];
}

const mapProductData = ({ type, products }: IArgs) => {
    console.log(products);
    if (!products || products.length < 1 || !Array.isArray(products)) {
        return;
    }
    const Component = Components[type];
    return products.map((item: IData, index: number) => (
        <Component
            key={index}
            index={index}
            imageURL={item.imageURL}
            name={item.name}
            descShort={item.descShort}
            descLong={item.descLong}
            price={item.price}
        />
    ));
};

export default mapProductData;
