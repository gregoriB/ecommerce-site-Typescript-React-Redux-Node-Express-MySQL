import Components from "./Components";
import { IData } from "../types/types";
import React from "react";

interface IArgs {
    type: string;
    products: IData[];
    miscProps?: any;
}

const mapProductData = ({ type, products, miscProps }: IArgs) => {
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
            categories={item.category}
            miscProps={miscProps}
        />
    ));
};

export default mapProductData;
