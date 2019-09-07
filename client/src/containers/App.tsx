import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserData, removeFromCart, updateQuantity } from "../store/actions/actionCreators";

import SearchPage from "./SearchPage";
import NavBar from "../components/navBar/NavBar";
import Home from "./HomePage";
import CheckoutPage from "../components/navBar/cart/CheckoutPage";

import styled from "styled-components";

interface IProps {
    cart: {};
    userData: any;
    updateUserData(val: any): any;
    removeFromCart(val: any): any;
    updateQuantity(val: any): any;
}

const App: React.FC<any> = ({
    cart,
    userData,
    updateUserData,
    updateQuantity,
    removeFromCart,
    toasts
}) => {
    const [mappedToasts, setMappedToasts] = useState<any>([]);
    useEffect(() => {
        toasts.length && setMappedToasts(toasts.map((product: any) => product));
    }, [toasts]);
    return (
        <AppContainer>
            <Router>
                <NavBar
                    cart={cart}
                    userData={userData}
                    updateUserData={updateUserData}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                </Switch>
                <ToastContainer>{mappedToasts}</ToastContainer>
            </Router>
        </AppContainer>
    );
};

interface IState {
    shoppingCart: any;
    userData: any;
    toasts: any;
}

const mapStateToProps = (state: IState) => ({
    cart: state.shoppingCart.cart,
    userData: state.userData,
    toasts: state.toasts.toastArr
});

const actionCreators = {
    updateUserData,
    removeFromCart,
    updateQuantity
};

export default connect(
    mapStateToProps,
    actionCreators
)(App);

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

const ToastContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    bottom: 1vh;
    right: 2vw;
    width: 25vw;
    z-index: 100000;
`;
