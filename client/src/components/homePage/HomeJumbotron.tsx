import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Jumbotron, Button } from "react-bootstrap";

import { updateSearch } from "../../store/actions/actionCreators";
import { stdBreakPoint } from "../../helpers/breakPoints";

interface IProps {
    updateSearch(val: string): void;
}

const HomeJumbotron: React.FC<IProps> = ({ updateSearch }) => {
    return (
        <StyledJumbotron>
            <BannerContainer>
                <BannerH1>The best place for fighting-game supplies</BannerH1>
                <Description></Description>
            </BannerContainer>
            <LinkContainer>
                <Link to="search">
                    <Button variant="outline-secondary" onClick={() => updateSearch("")}>
                        Start Shopping!
                    </Button>
                </Link>
            </LinkContainer>
        </StyledJumbotron>
    );
};

const actionCreators = {
    updateSearch
};

export default connect(
    null,
    actionCreators
)(HomeJumbotron);

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledJumbotron = styled(Jumbotron)`
    &.jumbotron {
        background: white;
        padding: 7vh 10vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        @media (max-width: ${stdBreakPoint}px) {
            text-align: center;
            padding: 3vh 5vw;
            margin-bottom: 1rem;
        }
    }
`;

const BannerContainer = styled.div`
    max-width: 70%;
`;

const LinkContainer = styled.div`
    align-self: center;
`;

const BannerH1 = styled.h1`
    @media (max-width: ${stdBreakPoint}px) {
        font-size: 1.2rem;
    }
`;

const Description = styled.div`
    @media (min-width: ${stdBreakPoint + 1}px) {
        ::after {
            content: "Competitive prices on arcade sticks, parts, and accessories from top-rated manufacturers.";
        }
    }
`;
