import components from "./Components";
import React from "react";
import { IProduct, IFilters } from "../types/generalTypes";

interface IProps {
    component: string;
    products: IProduct[];
    miscProps?: IFilters;
}

const mapProductData = ({ component, products, miscProps }: IProps) => {
    if (!products || products.length < 1 || !Array.isArray(products)) {
        return;
    }
    const Component = components[component];
    return products.map((item: IProduct, index: number) => (
        <Component
            key={index}
            index={index}
            imageURL={item.imageURL}
            itemName={item.itemName}
            descShort={item.descShort}
            descLong={item.descLong}
            price={item.price}
            categories={item.category!}
            miscProps={miscProps!}
            stock={item.stock}
        />
    ));
};

export default mapProductData;
