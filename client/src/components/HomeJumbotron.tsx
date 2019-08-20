import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import styled from "styled-components";

const BannerContainer = styled.div`
    width: 60%;
`;
const Banner = styled.h1``;
const Description = styled.div``;

const HomeJumbotron = () => {
    return (
        <Jumbotron
            style={{
                background: "white",
                padding: "5vh 10vw",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-around"
            }}
        >
            <BannerContainer>
                <Banner>It's the annual sale event!</Banner>
                <Description>
                    Discounts on quality arcade stick parts and accessories from manufactures like Hori and
                    Brook.
                </Description>
            </BannerContainer>
            <Button
                variant="outline-secondary"
                style={{
                    width: "25%",
                    maxHeight: "3.5rem",
                    alignSelf: "center",
                    marginLeft: "2rem"
                }}
            >
                Check out more sale items
            </Button>
        </Jumbotron>
    );
};

export default HomeJumbotron;
