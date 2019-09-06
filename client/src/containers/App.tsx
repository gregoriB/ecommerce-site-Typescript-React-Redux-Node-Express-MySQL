import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserData, removeAllFromCart, updateQuantity } from "../store/actions/actionCreators";

// import useMapToasts from "../hooks/useMapToasts";
// import CheckoutPage from "../components/CheckoutPage";
import SearchPage from "./SearchPage";
import NavBar from "../components/navBar/NavBar";
import Home from "./HomePage";
import styled from "styled-components";

interface IProps {
    cart: {};
    userData: any;
    updateUserData(val: any): any;
    removeAllFromCart(val: any): any;
    updateQuantity(val: any): any;
}

const App: React.FC<IProps> = ({ cart, userData, updateUserData, updateQuantity }) => {
    // const toasts = useMapToasts(productArr);
    // console.log(toasts);
    return (
        <AppContainer>
            <Router>
                <NavBar
                    cart={cart}
                    userData={userData}
                    updateUserData={updateUserData}
                    updateQuantity={updateQuantity}
                />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={SearchPage} />
                </Switch>
                {/* <ToastContainer>{toasts}</ToastContainer> */}
            </Router>
        </AppContainer>
    );
};

interface IState {
    shoppingCart: any;
    userData: any;
}

const mapStateToProps = (state: IState) => ({
    cart: state.shoppingCart.cart,
    userData: state.userData
});

const actionCreators = {
    updateUserData,
    removeAllFromCart,
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
