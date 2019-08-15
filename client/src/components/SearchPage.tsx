import React, { useEffect } from "react";
import SidePanel from "./SidePanel";
import SearchResults from "./SearchResults";
import styled from "styled-components";

import useDatabase from "../hooks/useDatabase";
import { IState } from "../store/reducers/populateProducts/populateProducts";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import populateProducts from "../store/actions/populateProducts";
import { IActionPopulate, IData } from "../types/types";

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
        populateProducts(actionProps);
    });
    return (
        <MainDiv>
            <SidePanel />
            <SearchResults products={results} />
        </MainDiv>
    );
};

const mapStateToProps = (state: IState) => ({
    results: state.searchResults
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (props: any) => dispatch(populateProducts(props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
