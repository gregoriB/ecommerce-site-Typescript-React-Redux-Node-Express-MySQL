import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IData } from "../../types/types";
import mapProductData from "../../helpers/mapProductData";

interface IProducts {
    products: IData[];
}

const Display = styled.div`
    width: 80vw;
    margin: 1rem;
    display: grid;
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const SearchResults: React.FC<IProducts> = ({ products }) => {
    const [mappedChildren, setMappedChildren] = useState();

    useEffect(() => {
        console.log(products);
        const mapped = mapProductData({ type: "ProductCard", products });
        setMappedChildren(mapped);
    }, [products]);

    return <Display>{mappedChildren}</Display>;
};

export default SearchResults;
