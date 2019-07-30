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
    cart: any;
}

const NavBar: React.FC<IProps> = ({ cart }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <NavContainer>
            <Navbar bg="light" variant="light" className="nav-bar">
                <Navbar.Brand href="#home">My Web Store</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home-page">Home</Nav.Link>
                    <Nav.Link href="#about-page">About</Nav.Link>
                    <Nav.Link href="#contact-page">Support</Nav.Link>
                </Nav>
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
