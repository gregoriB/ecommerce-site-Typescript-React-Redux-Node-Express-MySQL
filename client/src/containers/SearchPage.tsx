import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { IActionPopulate, IData } from "../types/types";
import SearchPanel from "../components/search/searchPanel/SearchPanel";
import SearchResults from "../components/search/SearchResults";
import queryDatabase from "../helpers/queryDatabase";
import populateProducts from "../store/actions/populateProducts";
import changeCategories, { IActionChangeCategories } from "../store/actions/changeCategories";

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
    populateProducts(data: IData[]): IActionPopulate;
    changeCategories(categories: any): IActionChangeCategories;
}

const SearchPage: React.FC<IProps> = ({
    query,
    populateProducts,
    results,
    changeCategories,
    allCategories
}) => {
    useEffect(() => {
        (async () => {
            const dbQuery = { path: "search", query };
            const data: IData[] = await queryDatabase(dbQuery);
            const actionProps: any = { type: "SEARCH RESULTS", payload: data };
            populateProducts(actionProps);
        })();
    }, [query]);

    useEffect(() => {
        const resultsCategories: any = {};
        results &&
            results
                .map(result => JSON.parse(result.category))
                .forEach((categoryArray: string[]) =>
                    categoryArray.forEach(
                        (category: string) =>
                            (resultsCategories[category] = resultsCategories[category] + 1 || 1)
                    )
                );
        const categoriesFiltered = Object.keys(resultsCategories).sort((a: any, b: any) =>
            a > b ? 1 : -1
        );
        changeCategories({ type: "NEW CATEGORIES", payload: categoriesFiltered });
    }, [results]);

    return (
        <MainDiv>
            <SearchPanel changeCategories={changeCategories} allCategories={allCategories} />
            <SearchResults products={results} />
        </MainDiv>
    );
};

interface IState {
    searchRequest: { query: string };
    products: { [key: string]: IData[] };
    categories: { [key: string]: string[] };
}

const mapStateToProps = (state: IState) => ({
    query: state.searchRequest.query,
    results: state.products.searchResults,
    allCategories: state.categories.allCategories,
    selectedCategories: state.categories.selectedCategories
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (optionsObj: IData[]) => dispatch(populateProducts(optionsObj)),
    changeCategories: (categories: any) => dispatch(changeCategories(categories))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
