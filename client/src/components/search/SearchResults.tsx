import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import mapProductData from "../../helpers/mapProductData";
import { IProduct, IFilters } from "../../types/generalTypes";
import { stdBreakPoint } from "../../helpers/breakPoints";

interface IProps {
    products: IProduct[];
    selectedCategories: string[];
    priceRange: number[] | undefined[];
}

const SearchResults: React.FC<IProps> = ({ products, selectedCategories, priceRange }) => {
    const [mappedChildren, setMappedChildren] = useState();
    useEffect(() => {
        const miscProps = {
            selectedCategories,
            priceRange
        };
        const mapped = mapProductData({ component: "ProductCard", products, miscProps });
        setMappedChildren(mapped);
    }, [products, selectedCategories, priceRange]);

    return <Display>{mappedChildren}</Display>;
};

interface IState {
    products: { searchResults: IProduct[] };
    filters: IFilters;
}

const mapStateToProps = (state: IState) => ({
    products: state.products.searchResults,
    selectedCategories: state.filters.selectedCategories,
    priceRange: state.filters.priceRange
});

export default connect(mapStateToProps)(SearchResults);

/* ~~~~~~ -- styling -- ~~~~~~ */

const Display = styled.div`
    width: 80vw;
    margin: 1rem;
    padding-left: calc(100% - 100vw);
    display: grid;
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    @media (max-width: ${stdBreakPoint}px) {
        padding: 0;
        width: 100vw;
        grid-gap: 0;
        margin: 0;
    }
`;
