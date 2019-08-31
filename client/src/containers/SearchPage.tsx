import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAChangeFilter, IAPopulate, IData } from "../types/types";
import SearchPanel from "../components/search/searchPanel/SearchPanel";
import SearchResults from "../components/search/SearchResults";
import queryDatabase from "../helpers/queryDatabase";
import { changeFilter, populateProducts } from "../store/actions/actionCreators";

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

interface IProps {
    allCategories: string[];
    selectedCategories: string[];
    query: string;
    results: IData[];
    priceRange: any;
    populateProducts(data: IAPopulate): IAPopulate;
    changeFilter(filter: IAChangeFilter): IAChangeFilter;
}

const SearchPage: React.FC<IProps> = ({
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
            const path = query ? `search/${query}` : "search";
            const data: IData[] = await queryDatabase({ path });
            const action = { type: "SEARCH RESULTS", payload: data };
            populateProducts(action);
        })();
    }, [query]);

    useEffect(() => {
        interface IResultsCategory {
            [key: string]: number;
        }
        const resultsCategories: IResultsCategory = {};
        results &&
            results
                .map(result => result.category && JSON.parse(result.category))
                .forEach((categoryArray: string[]) =>
                    categoryArray.forEach(
                        (category: string) =>
                            (resultsCategories[category] = resultsCategories[category] + 1 || 1)
                    )
                );
        const categoriesFiltered = Object.keys(resultsCategories).sort((a: string, b: string) =>
            a > b ? 1 : -1
        );
        const action = { type: "NEW_CATEGORIES", payload: categoriesFiltered };
        changeFilter(action);
    }, [results]);

    return (
        <MainDiv>
            <SearchPanel
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
