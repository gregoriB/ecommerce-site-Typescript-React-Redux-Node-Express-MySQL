import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import { maxWidth } from "./helpers/breakPoints";

import NavBar from "./components/navBar/NavBar";
import Main from "./components/Main";

import "./styles/transitions.css";

const App = () => {
    return (
        <AppContainer>
            <Router>
                <NavBar />
                <Main />
            </Router>
        </AppContainer>
    );
};

export default App;

/* ~~~~~~ -- styling -- ~~~~~~ */

const AppContainer = styled.div`
    margin: 0 auto;
    max-width: ${maxWidth}px;
`;
