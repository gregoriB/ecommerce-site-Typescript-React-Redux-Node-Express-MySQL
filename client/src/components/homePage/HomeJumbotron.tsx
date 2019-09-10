import React from "react";
import { connect } from "react-redux";
import { updateSearch } from "../../store/actions/actionCreators";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import styled from "styled-components";

interface IProps {
    updateSearch(val: string): void;
}

const HomeJumbotron: React.FC<IProps> = ({ updateSearch }) => {
    return (
        <StyledJumbotron>
            <BannerContainer>
                <h1>The best place for fighting game supplies</h1>
                <div>
                    Competitive prices on arcade sticks, parts, and accessories from top-rated
                    manufacturers.
                </div>
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
        justify-content: space-around;
    }
`;

const BannerContainer = styled.div`
    max-width: 70%;
`;

const LinkContainer = styled.div`
    align-self: center;
`;
