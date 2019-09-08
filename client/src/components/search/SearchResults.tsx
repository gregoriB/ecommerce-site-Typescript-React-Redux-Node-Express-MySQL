import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import mapProductData from "../../helpers/mapProductData";

const SearchResults: React.FC<any> = ({ products, selectedCategories, priceRange }) => {
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

interface IState {
    products: { [key: string]: any };
    filters: { [key: string]: string[] };
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
    grid-template-columns: repeat(auto-fill, minmax(20rem, 0fr));
`;
