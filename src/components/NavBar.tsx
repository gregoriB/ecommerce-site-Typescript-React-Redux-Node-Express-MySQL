import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";

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
    cart: number[];
}

const NavBar: React.FC<IProps> = ({ cart }) => {
    return (
        <NavContainer>
            <Navbar bg="light" variant="light" className="nav-bar">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <div>{cart}</div>
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>
        </NavContainer>
    );
};

export default NavBar;
