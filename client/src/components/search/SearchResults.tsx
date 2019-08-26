import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IData } from "../../types/types";
import mapProductData from "../../helpers/mapProductData";

interface IProps {
    products: IData[];
    selectedCategories: string[];
    priceRange: any;
}

const Display = styled.div`
    width: 80vw;
    margin: 1rem;
    padding-left: calc(100% - 100vw);
    display: grid;
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 0fr));
`;

const SearchResults: React.FC<IProps> = ({ products, selectedCategories, priceRange }) => {
    const [mappedChildren, setMappedChildren] = useState();

    useEffect(() => {
        const miscProps = {
            selectedCategories,
            priceRange
        };
        const mapped = mapProductData({ type: "ProductCard", products, miscProps });
        setMappedChildren(mapped);
    }, [products, selectedCategories, priceRange]);

    return <Display>{mappedChildren}</Display>;
};

export default SearchResults;
