import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchPage from "./components/search/SearchPage";
import NavBar from "./components/navBar/NavBar";
import Home from "./components/homePage/HomePage";
import { connect } from "react-redux";
import CheckoutPage from "./components/shoppingCart/CheckoutPage";
import Toasts from "./components/toasts/Toasts";
import { updateWindowWidth } from "./store/actions/actionCreators";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./styles/transitions.css";
import styled from "styled-components";
import { stdBreakPoint } from "./helpers/breakPoints";

interface IProps {
    updateWindowWidth(): void;
}
const App: React.FC<IProps> = ({ updateWindowWidth }) => {
    useEffect(() => {
        const updateWindowWidthReducer = () => {
            updateWindowWidth();
        };
        window.addEventListener("resize", updateWindowWidthReducer);
        return () => {
            window.removeEventListener("resize", updateWindowWidthReducer);
        };
    }, [updateWindowWidth]);
    return (
        <AppContainer>
            <Router>
                <NavBar />
                <Route
                    render={({ location }) => (
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                timeout={{ enter: 600, exit: 100 }}
                                classNames="page"
                                appear={true}
                            >
                                <Switch location={location}>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/search" component={SearchPage} />
                                    <Route path="/checkout" component={CheckoutPage} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}
                />
                <Toasts />
            </Router>
        </AppContainer>
    );
};

const actionCreators = {
    updateWindowWidth
};

export default connect(
    null,
    actionCreators
)(App);

/* ~~~~~~ -- styling -- ~~~~~~ */

const AppContainer = styled.div`
    position: relative;
    width: 100vw;
    min-height: 100vh;
    max-width: 1600px;
    margin: 0 auto;
    position: relative;
    margin: 0 auto;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    ::-webkit-scrollbar {
        background: #f8f9fa;
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #6c757d;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #5a6168;
    }
    ::-webkit-scrollbar-track {
        background: #f8f9fa;
    }
    @media (max-width: ${stdBreakPoint}px) {
        ::-webkit-scrollbar {
            width: 5px;
        }
    }
`;
