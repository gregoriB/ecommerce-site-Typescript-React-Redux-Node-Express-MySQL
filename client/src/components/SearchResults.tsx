import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useMapProductData from "../hooks/useMapProductData";
import { IData } from "../types/types";

interface IProps {
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

const SearchResults: React.FC<IProps> = ({ products }) => {
    const [mappedResults, setMappedResults] = useState();
    const mapped = useMapProductData({
        type: "ProductCard",
        products
    });
    useEffect(() => {
        setMappedResults(mapped);
    });

    return <Display>{mappedResults}</Display>;
};

export default SearchResults;
