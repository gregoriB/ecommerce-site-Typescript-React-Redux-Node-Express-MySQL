import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles//App.css";

import Main from "../components/SearchPage";
import NavBar from "../components/NavBar";
import Home from "./HomePage";
// import useMapToasts from "../hooks/useMapToasts";
// import CheckoutPage from "../components/CheckoutPage";

import { connect } from "react-redux";
import { IState } from "../store/reducers/addToCart/addToCart";

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

// const ToastContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     position: fixed;
//     bottom: 1vh;
//     right: 2vw;
//     width: 25vw;
//     z-index: 100000;
// `;

interface IProps {
    cart: {};
    productArr: number[];
}

const App: React.FC<IProps> = ({ cart, productArr }) => {
    // const toasts = useMapToasts(productArr);
    // console.log(toasts);
    return (
        <AppContainer className="app">
            <Router>
                <NavBar cart={cart} />
                <Switch>
                    <Route exact path="/Main" component={Home} />
                    <Route exact path="/search-results" component={Main} />
                    {/* <Route exact path="/checkout" component={CheckoutPage} /> */}
                </Switch>
                {/* <ToastContainer>{toasts}</ToastContainer> */}
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
