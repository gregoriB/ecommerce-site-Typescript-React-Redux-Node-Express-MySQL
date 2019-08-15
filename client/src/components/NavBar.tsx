import React, { useState } from "react";
import styled from "styled-components";
import ShoppingCartModal from "./ShoppingCartModal";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
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
    background: white;
    border: none;
    position: absolute;
    margin-right: 0.3rem;
    right: 0;
`;

interface IProps {
    cart: Object;
}

const NavBar: React.FC<RouteComponentProps & IProps> = ({ cart, history }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [loginValues, setLoginValues] = useState({ name: "", password: "" });

    type keyboardEvent = React.ChangeEvent<any>;
    const handleSearchChange = (e: keyboardEvent) => {
        setSearchValue(e.target.value);
    };

    const handleLoginChange = (e: keyboardEvent) => {
        setLoginValues({
            ...loginValues,
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmitSearch = (e: FormElem) => {
        e.preventDefault();
        setSearchValue("");
        history.push("/search-results");
    };

    const handleSubmitLogin = (e: FormElem) => {
        e.preventDefault();
    };

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
                <Form inline onSubmit={handleSubmitSearch} action="/search-results">
                    <InputWrapper>
                        <FormControl
                            type="text"
                            placeholder="Search inventory"
                            value={searchValue}
                            onChange={handleSearchChange}
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
                        marginLeft: "auto",
                        marginRight: "1rem"
                    }}
                >
                    <Form inline onSubmit={handleSubmitLogin}>
                        <FormControl
                            type="text"
                            name="name"
                            value={loginValues.name}
                            placeholder="username"
                            className="mr-sm-2 form-control-sm"
                            onChange={handleLoginChange}
                        />
                        <FormControl
                            type="password"
                            name="password"
                            value={loginValues.password}
                            placeholder="password"
                            className="mr-sm-2 form-control-sm"
                            onChange={handleLoginChange}
                        />
                        <Button variant="outline-secondary" href="#search-results" className="btn-sm">
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
                        <Nav.Link href="#home-page">register new account</Nav.Link>
                    </span>
                </Nav>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon="shopping-cart" style={{ margin: "0 .5rem" }} size="lg" />
                </Button>
                <ShoppingCartModal cart={cart} show={isModalOpen} onHide={() => setIsModalOpen(false)} />
            </Navbar>
        </NavContainer>
    );
};

export default withRouter(NavBar);
