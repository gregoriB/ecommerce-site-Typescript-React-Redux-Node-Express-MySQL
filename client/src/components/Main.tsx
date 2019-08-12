import React from "react";
import SidePanel from "./SidePanel";
import Products from "./Results";
import styled from "styled-components";

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f8f9fa;
    width: 95vw;
    margin: 0 auto;
`;

const Main = () => {
    return (
        <MainDiv>
            <SidePanel />
            <Products />
        </MainDiv>
    );
};

export default Main;
