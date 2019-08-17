import React, { useState } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCartModal from "./ShoppingCartModal";
import LoginForm from "./LoginForm";

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

    type keyboardEvent = React.ChangeEvent<any>;
    const handleSearchChange = (e: keyboardEvent) => {
        setSearchValue(e.target.value);
    };

    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmitSearch = (e: FormElem) => {
        e.preventDefault();
        setSearchValue("");
        history.push("/search-results");
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
                <LoginForm />
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon icon="shopping-cart" style={{ margin: "0 .5rem" }} size="lg" />
                </Button>
                <ShoppingCartModal cart={cart} show={isModalOpen} onHide={() => setIsModalOpen(false)} />
            </Navbar>
        </NavContainer>
    );
};

export default withRouter(NavBar);
