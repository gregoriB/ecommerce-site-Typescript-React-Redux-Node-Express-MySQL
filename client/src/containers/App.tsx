import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles//App.css";

import Main from "../components/Main";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import CheckoutPage from "../components/CheckoutPage";

import { connect } from "react-redux";
import { IState } from "../reducers/addToCart";

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
    cart: {};
    productArr: number[];
}

const App: React.FC<IProps> = ({ cart, productArr }) => {
    return (
        <AppContainer className="app">
            <Router>
                <NavBar cart={cart} />
                <Switch>
                    <Route exact path="/Main" component={Home} />
                    <Route
                        exact
                        path="/search-results"
                        render={() => <Main productArr={productArr} />}
                    />
                    {/* <Route exact path="/checkout" component={CheckoutPage} /> */}
                </Switch>
            </Router>
        </AppContainer>
    );
};

const mapStateToProps = (state: IState) => {
    return {
        cart: state.cart,
        productArr: state.productArr
    };
};

export default connect(mapStateToProps)(App);
