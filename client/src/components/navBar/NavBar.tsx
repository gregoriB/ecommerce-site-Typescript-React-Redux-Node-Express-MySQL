import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCartModal from "./ShoppingCartModal";
import LoginForm from "./LoginForm";
import SearchForm from "../../containers/SearchForm";

const NavContainer = styled.div`
    padding: 0 2rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #f8f9fa;
    width: 100vw;
`;

interface IProps {
    cart: Object;
}

const NavBar: React.FC<IProps> = ({ cart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <NavContainer>
            <Navbar
                bg="light"
                variant="light"
                className="nav-bar"
                style={{
                    justifyContent: "flex-start",
                    maxWidth: 2000,
                    margin: "0 auto"
                }}
            >
                <Link to="Main">
                    <Navbar.Brand style={{ fontFamily: "'Lexend Exa', sans-serif" }}>
                        Super Meter Arcade
                    </Navbar.Brand>
                </Link>
                <SearchForm />
                <LoginForm />
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon="shopping-cart" style={{ margin: "0 .5rem" }} size="lg" />
                </Button>
                <ShoppingCartModal cart={cart} show={isModalOpen} onHide={() => setIsModalOpen(false)} />
            </Navbar>
        </NavContainer>
    );
};

export default NavBar;
