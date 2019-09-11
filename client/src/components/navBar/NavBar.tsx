import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCartModal from "../shoppingCart/ShoppingCartModal";
import LoginForm from "./login/LoginForm";
import SearchForm from "./SearchForm";
import { stdBreakPoint } from "../../helpers/breakPoints";

const NavBar: React.FC<RouteComponentProps> = ({ history }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNav = () => {
        setIsExpanded(prevState => !prevState);
    };

    const navigateToHomePage = () => {
        setIsExpanded(false);
        history.push(`/`);
    };

    return (
        <>
            <NavContainer isExpanded={isExpanded}>
                <StyledNavbar bg="light" expand="lg" expanded={isExpanded}>
                    <StyledNavbarToggle aria-controls="basic-navbar-nav" onClick={toggleNav} />
                    <StyledNavbarCollapse id="basic-navbar-nav">
                        <BrandSearchContainer>
                            <HomeButton onClick={navigateToHomePage}>
                                <StyledNavbarBrand>Super Meter Arcade</StyledNavbarBrand>
                                <HomeLink>Home</HomeLink>
                            </HomeButton>
                            <SearchForm hideNav={() => setIsExpanded(false)} />
                        </BrandSearchContainer>
                        <LoginForm />
                    </StyledNavbarCollapse>
                    <ShoppingCartModal
                        show={isModalOpen}
                        hideNav={() => setIsExpanded(false)}
                        onHide={() => setIsModalOpen(false)}
                    />
                </StyledNavbar>
                <ShoppingCartButton onClick={() => setIsModalOpen(true)} variant="outline-secondary">
                    <StyledShoppingCartIcon icon="shopping-cart" size="1x" />
                </ShoppingCartButton>
            </NavContainer>
        </>
    );
};

export default withRouter(NavBar);

/* ~~~~~~ -- styling -- ~~~~~~ */

type isExpanded = { isExpanded: boolean };

const NavContainer = styled.div<isExpanded>`
    position: sticky;
    padding: 0;
    top: 0;
    left: 0;
    display: flex;
    z-index: 100;
    width: 100vw;
    background: #f8f9fa;
    transition: height 0.2s;
    height: 60px;
    @media (max-width: ${stdBreakPoint}px) {
        height: ${props => (props.isExpanded ? "100vh" : "60px")};
        position: fixed;
    }
`;

const StyledNavbar = styled(Navbar)`
    &.navbar {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        max-width: 2000px;
        margin: 0 auto;
        @media (min-width: ${stdBreakPoint + 1}px) {
            padding: 0.375rem 4rem;
        }
        @media (max-width: ${stdBreakPoint}px) {
            position: fixed;
        }
    }
`;

const HomeButton = styled.button`
    background: none;
    border: none;
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
    &.navbar-brand {
        font-family: "Lexend Exa", sans-serif;
        margin: 0;
        @media (max-width: ${stdBreakPoint}px) {
            display: none;
            margin: 0;
        }
    }
`;

const HomeLink = styled.button`
    border: none;
    background: none;
    margin: 1rem 0;
    display: none;
    @media (max-width: ${stdBreakPoint}px) {
        display: block;
        width: unset;
    }
`;

const BrandSearchContainer = styled.div`
    margin-right: auto;
    max-width: 70%;
    display: flex;
    @media (max-width: ${stdBreakPoint}px) {
        flex-direction: column;
        align-items: flex-start;
        margin: 1rem 0;
    }
`;

const ShoppingCartButton = styled(Button)`
    &.btn {
        border: none;
        width: 3rem;
        height: 2.5rem;
        margin: 0 2rem;
        align-self: center;
        position: absolute;
        top: 0.5rem;
        right: calc(1.5rem + (100% - 100vw));
        margin: 0;
    }
`;

const StyledShoppingCartIcon = styled(FontAwesomeIcon)``;

const StyledNavbarCollapse = styled(Navbar.Collapse)`
    &.navbar-collapse {
        justify-content: flex-start;
    }
`;

const StyledNavbarToggle = styled(Navbar.Toggle)``;
