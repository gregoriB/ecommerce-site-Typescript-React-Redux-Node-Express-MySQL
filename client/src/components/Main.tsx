import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import SearchPage from "./search/SearchPage";
import Home from "./homePage/HomePage";
import { connect } from "react-redux";
import CheckoutPage from "./shoppingCart/CheckoutPage";
import Toasts from "./toasts/Toasts";
import { updateWindowWidth } from "../store/actions/actionCreators";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import styled from "styled-components";
import { stdBreakPoint } from "../helpers/breakPoints";

interface IProps {
    updateWindowWidth(): void;
}
const Main: React.FC<IProps> = ({ updateWindowWidth }) => {
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
        <MainContainer>
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
        </MainContainer>
    );
};

const actionCreators = {
    updateWindowWidth
};

export default connect(
    null,
    actionCreators
)(Main);

/* ~~~~~~ -- styling -- ~~~~~~ */

const MainContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100%;
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
