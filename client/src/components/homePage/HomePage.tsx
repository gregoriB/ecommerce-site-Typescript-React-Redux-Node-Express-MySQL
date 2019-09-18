import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { populateFeaturedProducts, updateSearch } from "../../store/actions/actionCreators";
import queryDatabase from "../../helpers/queryDatabase";
import { stdBreakPoint, maxWidth } from "../../helpers/breakPoints";
import { IQueryDBArgs, IProduct } from "../../types/generalTypes";

import FeaturedCarousel from "./Carousel";
import HomeJumbotron from "./HomeJumbotron";

interface IProps {
    windowWidth: number;
    populateFeaturedProducts(val: IProduct[]): void;
    updateSearch(val: string): void;
}

const HomePage: React.FC<IProps> = ({ populateFeaturedProducts, updateSearch, windowWidth }) => {
    useEffect(() => {
        (async () => {
            const dbQuery: IQueryDBArgs = { path: "home" };
            const data: IProduct[] = await queryDatabase(dbQuery);
            populateFeaturedProducts(data);
        })();
    }, [populateFeaturedProducts]);
    useEffect(() => {
        updateSearch("");
    }, [updateSearch]);

    useEffect(() => {}, [windowWidth]);
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel />
        </HomeContainer>
    );
};

interface IState {
    windowSize: {
        windowWidth: number;
    };
}

const mapStateToProps = (state: IState) => ({
    windowWidth: state.windowSize.windowWidth
});

const actionCreators = {
    populateFeaturedProducts,
    updateSearch
};

export default connect(
    mapStateToProps,
    actionCreators
)(HomePage);

/* ~~~~~~ -- styling -- ~~~~~~ */

const HomeContainer = styled.div`
    position: absolute;
    top: 52px;
    left: 0;
    width: 100%;
    max-width: ${maxWidth}px;
    margin: 0 auto;
    @media (min-width: ${maxWidth}px) {
        left: calc((100vw - ${maxWidth}px) / 2);
    }
    @media (max-width: ${stdBreakPoint}px) {
        top: 60px;
    }
`;
