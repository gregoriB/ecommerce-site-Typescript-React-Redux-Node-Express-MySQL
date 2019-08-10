import React, { useState } from "react";
import styled from "styled-components";
import ShoppingCartModal from "./ShoppingCartModal";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavContainer = styled.div`
    padding: 0 2rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #f8f9fa;
    width: 100vw;
`;

const InputWrapper = styled.div`
    position: relative;
    background: white;
    border: thin solid #dfdfdf;
    border-radius: 15px;
    display: flex;
    align-items: center;
`;

const SearchButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    right: 0;
`;

interface IProps {
    cart: Object;
}

const NavBar: React.FC<IProps> = ({ cart }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <NavContainer>
            <Navbar
                bg="light"
                variant="light"
                className="nav-bar"
                style={{ justifyContent: "flex-start" }}
            >
                <Link to="Main">
                    <Navbar.Brand>My Web Store</Navbar.Brand>
                </Link>
                <Form inline>
                    <InputWrapper>
                        <FormControl
                            type="text"
                            placeholder="Search inventory"
                            className="mr-sm-2 search-input"
                            style={{
                                background: "transparent",
                                borderRadius: "15px",
                                border: "none"
                            }}
                        />
                        <SearchButton>
                            <FontAwesomeIcon icon="search" />
                        </SearchButton>
                    </InputWrapper>
                </Form>
                <Nav
                    style={{
                        // padding: ".5rem",
                        // borderRadius: "5px",
                        // margin: "0 !important",
                        marginLeft: "auto",
                        marginRight: "1rem"
                        // background: "darkgray"
                    }}
                >
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="username"
                            className="mr-sm-2 form-control-sm"
                        />
                        <FormControl
                            type="password"
                            placeholder="password"
                            className="mr-sm-2 form-control-sm"
                        />
                        <Button
                            variant="outline-secondary"
                            href="#search-results"
                            className="btn-sm"
                        >
                            Sign In
                            <FontAwesomeIcon
                                icon="sign-in-alt"
                                size="lg"
                                style={{ margin: "0 .5rem" }}
                            />
                        </Button>
                    </Form>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "1rem"
                        }}
                    >
                        {"or "}
                        <Nav.Link href="#home-page">
                            register new account
                        </Nav.Link>
                    </span>
                </Nav>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon
                        icon="shopping-cart"
                        style={{ margin: "0 .5rem" }}
                        size="lg"
                    />
                </Button>
                <ShoppingCartModal
                    cart={cart}
                    show={isModalOpen}
                    onHide={() => setIsModalOpen(false)}
                />
            </Navbar>
        </NavContainer>
    );
};

export default NavBar;
