import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { IActionPopulate, IData } from "../types/types";
import populateProducts from "../store/actions/populateProducts";
import useDatabase from "../hooks/useDatabase";
import SidePanel from "../components/SidePanel";
import SearchResults from "../components/SearchResults";

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f8f9fa;
    width: 95vw;
    margin: 0 auto;
`;

interface IProps {
    results: IData[];
    populateProducts(data: IData[]): IActionPopulate;
}

const Main: React.FC<IProps> = ({ results, populateProducts }) => {
    const data: IData[] = useDatabase("search");
    const actionProps: any = { type: "SEARCH", payload: data };
    useEffect(() => {
        (!results || results.length < 0) && populateProducts(actionProps);
    });
    return (
        <MainDiv>
            <SidePanel />
            <SearchResults products={results} />
        </MainDiv>
    );
};

interface IState {
    products: {
        [key: string]: IData[];
    };
}

const mapStateToProps = ({ products }: IState) => ({
    results: products.searchResults
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (props: IData[]) => dispatch(populateProducts(props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
