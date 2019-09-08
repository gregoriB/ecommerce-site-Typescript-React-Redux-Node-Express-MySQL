import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCartModal from "../shoppingCart/ShoppingCartModal";
import LoginForm from "./login/LoginForm";
import SearchForm from "./SearchForm";

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <NavContainer>
            <StyledNavbar bg="light" variant="light" className="nav-bar">
                <Link to="/">
                    <StyledNavbarBrand>Super Meter Arcade</StyledNavbarBrand>
                </Link>
                <SearchForm />
                <LoginForm />
                <ShoppingCartButton onClick={() => setIsModalOpen(true)} variant="outline-secondary">
                    <StyledShoppingCartIcon icon="shopping-cart" size="1x" />
                </ShoppingCartButton>
                <ShoppingCartModal show={isModalOpen} onHide={() => setIsModalOpen(false)} />
            </StyledNavbar>
        </NavContainer>
    );
};

export default NavBar;

/* ~~~~~~ -- styling -- ~~~~~~ */

const NavContainer = styled.div`
    padding: 0 2rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #f8f9fa;
    width: 100vw;
`;

const StyledNavbar = styled(Navbar)`
    justify-content: flex-start;
    max-width: 2000px;
    margin: 0 auto;
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
    font-family: "Lexend Exa", sans-serif;
`;

const ShoppingCartButton = styled(Button)`
    &.btn {
        border: none;
    }
`;

const StyledShoppingCartIcon = styled(FontAwesomeIcon)``;
