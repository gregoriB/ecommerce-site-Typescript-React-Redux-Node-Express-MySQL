import React from "react";
import NavBar from "./components/navBar/NavBar";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

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

const AppContainer = styled.div`
    margin: 0 auto;
    max-width: 1600px;
`;
