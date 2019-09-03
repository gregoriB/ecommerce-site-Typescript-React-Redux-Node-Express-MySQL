import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import styled from "styled-components";

const BannerContainer = styled.div`
    max-width: 70%;
`;

const LinkContainer = styled.div`
    align-self: center;
`;

const Banner = styled.h1``;
const Description = styled.div``;

const HomeJumbotron = () => {
    return (
        <Jumbotron
            style={{
                background: "white",
                padding: "5vh 10vw",
                display: "flex",
                justifyContent: "space-around"
            }}
        >
            <BannerContainer>
                <Banner>The best place for fighting game supplies.</Banner>
                <Description>
                    Competitive prices on arcade sticks, parts, and accessories from top-rated
                    manufacturers.
                </Description>
            </BannerContainer>
            <LinkContainer>
                <Link to="search">
                    <Button variant="outline-secondary">Start Shopping!</Button>
                </Link>
            </LinkContainer>
        </Jumbotron>
    );
};

export default HomeJumbotron;
