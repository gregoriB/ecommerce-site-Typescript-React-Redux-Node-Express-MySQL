import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IActionPopulate, IData } from "../types/types";
import useDatabase from "../hooks/useDatabase";
import SearchPanel from "../components/SearchPanel";
import SearchResults from "../components/SearchResults";

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #f8f9fa;
    width: 95vw;
    margin: 0 auto;
`;

interface IState {
    products: {
        [key: string]: IData[];
    };
}

interface IProps {
    results: IData[];
    populateProducts(data: IData[]): IActionPopulate;
}

const Main: React.FC<IProps> = () => {
    const results = useSelector((state: IState) => state.products.searchResults)
    const dispatch = useDispatch();
    const data: IData[] = useDatabase("search");
    const actionProps: any = { type: "SEARCH", payload: data };
    useEffect(() => {
        (!results || results.length < 0) && dispatch(actionProps);
    });
    return (
        <MainDiv>
            <SearchPanel />
            <SearchResults products={results} />
        </MainDiv>
    );
};

export default Main;
