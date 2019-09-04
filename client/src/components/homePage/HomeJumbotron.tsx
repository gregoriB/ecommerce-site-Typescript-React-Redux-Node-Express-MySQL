import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import styled from "styled-components";

const HomeJumbotron = () => {
    return (
        <StyledJumbotron>
            <BannerContainer>
                <h1>The best place for fighting game supplies.</h1>
                <div>
                    Competitive prices on arcade sticks, parts, and accessories from top-rated
                    manufacturers.
                </div>
            </BannerContainer>
            <LinkContainer>
                <Link to="search">
                    <Button variant="outline-secondary">Start Shopping!</Button>
                </Link>
            </LinkContainer>
        </StyledJumbotron>
    );
};

export default HomeJumbotron;

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledJumbotron = styled(Jumbotron)`
    &.jumbotron {
        background: white;
        padding: 7vh 10vw;
        display: flex;
        justify-content: space-around;
    }
`;

const BannerContainer = styled.div`
    max-width: 70%;
`;

const LinkContainer = styled.div`
    align-self: center;
`;
