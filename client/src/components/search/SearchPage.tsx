import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addCategoriesToFilter, populateSearchProducts } from "../../store/actions/actionCreators";
import styled from "styled-components";
import FilterPanel from "./FilterPanel/FilterPanel";
import SearchResults from "./SearchResults";
import queryDatabase from "../../helpers/queryDatabase";
import { IProduct, IFilters } from "../../types/types";

interface IProps {
    query: string;
    products: IProduct[];
    priceRange: number[] | undefined[];
    addCategoriesToFilter(arr: string[]): void;
    populateSearchProducts(items: IProduct[]): void;
}

const SearchPage: React.FC<IProps> = ({
    query,
    populateSearchProducts,
    products,
    addCategoriesToFilter,
    priceRange
}) => {
    useEffect(() => {
        (async () => {
            // if no search query, instead use default route query.  See server.ts to change the default query.
            const path = query ? `products/${query}` : "products";
            const data = await queryDatabase({ path });
            populateSearchProducts(data);
        })();
    }, [query, populateSearchProducts]);

    useEffect(() => {
        // map categories for filters IF the `results` item is within the designated price range
        const mapResults = () => {
            const min = priceRange[0];
            const max = priceRange[1];
            return products
                .map((result: IProduct) => {
                    // min or max could be `undefined`
                    if ((min && result.price < min) || (max && result.price > max)) {
                        return null;
                    }
                    return result.category && JSON.parse(result.category); //array from DB is a string so it needs to be parsed
                })
                .filter(Boolean); //get rid of those null array items
        };
        const filterDuplicateCategories = (matrix: string[][]) => {
            type tempObj = { [key: string]: number };
            const tempObj: tempObj = {};
            matrix.forEach((categoryArray: string[]) => {
                categoryArray.forEach((category: string) => {
                    tempObj[category] = tempObj[category] + 1 || 1;
                });
            });
            return tempObj;
        };
        if (products) {
            const resultsMapped = mapResults();
            const filterdCategoriesObj = filterDuplicateCategories(resultsMapped);
            const filteredCategoriesArr = Object.keys(filterdCategoriesObj).sort(
                (a: string, b: string) => (a > b ? 1 : -1)
            );
            addCategoriesToFilter(filteredCategoriesArr);
        }
    }, [products, priceRange, addCategoriesToFilter]);

    return (
        <MainDiv>
            <FilterPanel />
            <SearchResults />
        </MainDiv>
    );
};

interface IState {
    searchRequest: { query: string };
    products: { searchResults: IProduct[] };
    filters: IFilters;
}

const mapStateToProps = (state: IState) => ({
    query: state.searchRequest.query,
    products: state.products.searchResults,
    priceRange: state.filters.priceRange
});

const actionCreators = {
    populateSearchProducts,
    addCategoriesToFilter
};

export default connect(
    mapStateToProps,
    actionCreators
)(SearchPage);

/* ~~~~~~ -- styling -- ~~~~~~ */

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #f8f9fa;
    width: 100vw;
    margin: 0 auto;
    padding-left: 2vw;
    padding-right: calc(100vw - 100%);
`;
