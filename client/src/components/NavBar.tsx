import React, { useState } from "react";
import styled from "styled-components";
import ShoppingCartModal from "./ShoppingCartModal";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <NavContainer>
            <Navbar
                bg="light"
                variant="light"
                className="nav-bar"
                style={{ justifyContent: "flex-start" }}
            >
                <Navbar.Brand href="#home">My Web Store</Navbar.Brand>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search inventory"
                        className="mr-sm-2"
                    />
                    <Button variant="outline-primary" href="#search-results">
                        Search
                    </Button>
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
                            variant="outline-primary"
                            href="#search-results"
                            className="btn-sm"
                        >
                            Login
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
                    Cart
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
