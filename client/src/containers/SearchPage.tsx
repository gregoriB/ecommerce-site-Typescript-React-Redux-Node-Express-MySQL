import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { IActionPopulate, IData } from "../types/types";
import SearchPanel from "../components/search/searchPanel/SearchPanel";
import SearchResults from "../components/search/SearchResults";
import queryDatabase from "../helpers/queryDatabase";
import populateProducts from "../store/actions/populateProducts";

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #f8f9fa;
    width: 95vw;
    margin: 0 auto;
`;

interface IProps {
    query: string;
    results: IData[];
    populateProducts(data: IData[]): IActionPopulate;
}

const SearchPage: React.FC<IProps> = ({ query, populateProducts, results }) => {
    useEffect(() => {
        (async () => {
            const dbQuery = { path: "search", query };
            const data: IData[] = await queryDatabase(dbQuery);
            const actionProps: any = { type: "SEARCH RESULTS", payload: data };
            populateProducts(actionProps);
        })();
    }, [query]);

    return (
        <MainDiv>
            <SearchPanel />
            <SearchResults products={results} />
        </MainDiv>
    );
};

interface IState {
    searchRequest: { query: string };
    products: { [key: string]: IData[] };
}

const mapStateToProps = (state: IState) => ({
    query: state.searchRequest.query,
    results: state.products.searchResults
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (val: IData[]) => dispatch(populateProducts(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
