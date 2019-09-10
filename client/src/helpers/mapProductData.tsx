import Components from "./Components";
import React from "react";
import { IProduct, IFilters } from "../types/generalTypes";

interface IProps {
    type: string;
    products: IProduct[];
    miscProps?: IFilters;
}

const mapProductData = ({ type, products, miscProps }: IProps) => {
    if (!products || products.length < 1 || !Array.isArray(products)) {
        return;
    }
    const Component = Components[type];
    return products.map((item: IProduct, index: number) => (
        <Component
            key={index}
            index={index}
            imageURL={item.imageURL}
            itemName={item.itemName}
            descShort={item.descShort}
            descLong={item.descLong}
            price={item.price}
            categories={item.category}
            miscProps={miscProps}
            stock={item.stock}
        />
    ));
};

export default mapProductData;
