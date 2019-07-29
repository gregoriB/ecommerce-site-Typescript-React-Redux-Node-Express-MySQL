import React from "react";
import "../styles//App.css";

import Main from "../components/Main";
import NavBar from "../components/NavBar";

import { connect } from "react-redux";

import styled from "styled-components";

const AppContainer = styled.div`
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
`;

interface IProps {
    cart: number[];
}

const App: React.FC<IProps> = ({ cart }) => {
    return (
        <AppContainer>
            <NavBar cart={[...cart]} />
            <Main />
        </AppContainer>
    );
};

const mapStateToProps = ({ cart }: { cart: number[] }) => {
    return { cart };
};

export default connect(mapStateToProps)(App);
