import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchPage from "./search/SearchPage";
import NavBar from "./navBar/NavBar";
import Home from "./homePage/HomePage";
import CheckoutPage from "./shoppingCart/CheckoutPage";
import Toasts from "./toasts/Toasts";

import styled from "styled-components";

const App = () => {
    return (
        <AppContainer>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                </Switch>
                <Toasts />
            </Router>
        </AppContainer>
    );
};

export default App;

/* ~~~~~~ -- styling -- ~~~~~~ */

const AppContainer = styled.div`
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
`;
