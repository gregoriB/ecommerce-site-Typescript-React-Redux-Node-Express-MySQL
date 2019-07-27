import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 5vh;
    background-color: black;
`

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    margin: 0 1vw;
    :nth-child(1) {
        margin-right: auto;
    }
`

const NavBar = () => {
    return (
        <Nav className='nav-bar'>
            <NavLink href="#">Home</NavLink>
            <input type="text" placeholder='SEARCH' />
            <NavLink href="#">Shopping Cart</NavLink>
            <NavLink href="#">Login</NavLink>
        </Nav>
    )
}

export default NavBar;