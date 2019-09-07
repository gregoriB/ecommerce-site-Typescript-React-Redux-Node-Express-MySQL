import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAChangeFilter, IAPopulate, IData } from "../types/types";
import FilterPanel from "../components/search/FilterPanel/FilterPanel";
import SearchResults from "../components/search/SearchResults";
import queryDatabase from "../helpers/queryDatabase";
import { changeFilter, populateProducts } from "../store/actions/actionCreators";

interface IProps {
    allCategories: string[];
    selectedCategories: string[];
    query: string;
    results: IData[];
    priceRange: any;
    populateProducts(data: IAPopulate): IAPopulate;
    changeFilter(filter: IAChangeFilter): IAChangeFilter;
}

const SearchPage: React.FC<any> = ({
    query,
    populateProducts,
    results,
    changeFilter,
    allCategories,
    selectedCategories,
    priceRange
}) => {
    useEffect(() => {
        (async () => {
            // if no search query, instead use default route query.  See server.ts to change the default query.
            const path = query ? `products/${query}` : "products";
            const data: IData[] = await queryDatabase({ path });
            const action = { type: "SEARCH RESULTS", payload: data };
            populateProducts(action);
        })();
    }, [query, populateProducts]);

    useEffect(() => {
        // map categories for filters IF the `results` item is within the designated price range
        const mapResults = () => {
            const min = priceRange[0];
            const max = priceRange[1];
            return results
                .map((result: any) => {
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
        if (results) {
            const resultsMapped = mapResults();
            const filterdCategoriesObj = filterDuplicateCategories(resultsMapped);
            const filteredCategoriesArr = Object.keys(filterdCategoriesObj).sort(
                (a: string, b: string) => (a > b ? 1 : -1)
            );
            const action = { type: "NEW_CATEGORIES", payload: filteredCategoriesArr };
            changeFilter(action);
        }
    }, [results, priceRange, changeFilter]);

    return (
        <MainDiv>
            <FilterPanel
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                allCategories={allCategories}
                changeFilter={changeFilter}
            />
            <SearchResults
                products={results}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
            />
        </MainDiv>
    );
};

interface IState {
    searchRequest: { query: string };
    products: { [key: string]: IData[] };
    filters: { [key: string]: string[] };
}

const mapStateToProps = (state: IState) => ({
    query: state.searchRequest.query,
    results: state.products.searchResults,
    allCategories: state.filters.allCategories,
    selectedCategories: state.filters.selectedCategories,
    priceRange: state.filters.priceRange
});

const actionCreators = {
    populateProducts,
    changeFilter
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
