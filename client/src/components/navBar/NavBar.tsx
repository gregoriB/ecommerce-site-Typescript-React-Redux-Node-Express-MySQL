import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
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

const ShoppingCartButton = styled.button`
    background: none;
    color: #545b62;
    border: none;
    transition: 0.2s;
    padding: 0;
    font-size: 1.5rem;
    :hover {
        color: #181819;
    }
`;

interface IProps {
    cart: Object;
    userData: any;
    updateUserData(val: any): any;
}

const NavBar: React.FC<IProps> = ({ cart, userData, updateUserData }) => {
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
                <Link to="/">
                    <Navbar.Brand style={{ fontFamily: "'Lexend Exa', sans-serif" }}>
                        Super Meter Arcade
                    </Navbar.Brand>
                </Link>
                <SearchForm />
                <LoginForm userData={userData} updateUserData={updateUserData} />
                <ShoppingCartButton onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon="shopping-cart" style={{ margin: "0 .5rem" }} size="lg" />
                </ShoppingCartButton>
                <ShoppingCartModal cart={cart} show={isModalOpen} onHide={() => setIsModalOpen(false)} />
            </Navbar>
        </NavContainer>
    );
};

export default NavBar;
