import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import queryDatabase from "../../helpers/queryDatabase";
import FeaturedCarousel from "./Carousel";
import HomeJumbotron from "./HomeJumbotron";
import { populateFeaturedProducts } from "../../store/actions/actionCreators";

const HomePage: React.FC<any> = ({ populateFeaturedProducts }) => {
    useEffect(() => {
        (async () => {
            const dbQuery = { path: "home" };
            const data = await queryDatabase(dbQuery);
            populateFeaturedProducts(data);
        })();
    }, [populateFeaturedProducts]);
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel />
        </HomeContainer>
    );
};

const actionCreators = {
    populateFeaturedProducts
};

export default connect(
    null,
    actionCreators
)(HomePage);

/* ~~~~~~ -- styling -- ~~~~~~ */

const HomeContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
`;
