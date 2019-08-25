import React from "react";
import styled from "styled-components";
import { IActionPopulate, IData } from "../types/types";
import SearchPanel from "../components/search/searchPanel/SearchPanel";
import SearchResults from "../components/search/SearchResults";

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #f8f9fa;
    width: 95vw;
    margin: 0 auto;
`;

interface IProps {
    results: IData[];
    populateProducts(data: IData[]): IActionPopulate;
}

const Main: React.FC<IProps> = () => {
    return (
        <MainDiv>
            <SearchPanel />
            <SearchResults />
        </MainDiv>
    );
};

export default Main;
