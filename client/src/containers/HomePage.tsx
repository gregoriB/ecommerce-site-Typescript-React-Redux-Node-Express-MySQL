import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAPopulate, IData } from "../types/types";
import queryDatabase from "../helpers/queryDatabase";
import FeaturedCarousel from "../components/homePage/Carousel";
import HomeJumbotron from "../components/homePage/HomeJumbotron";
import { populateProducts } from "../store/actions/actionCreators";

interface IProps {
    results: IData[];
    populateProducts(data: IAPopulate): IAPopulate;
}

const HomeContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
`;

const HomePage: React.FC<IProps> = ({ populateProducts, results }) => {
    useEffect(() => {
        (async () => {
            const dbQuery = { path: "home/featured" };
            const data = await queryDatabase(dbQuery);
            const actionProps = { type: "FEATURED RESULTS", payload: data };
            populateProducts(actionProps);
        })();
    }, []);
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel products={results} />
        </HomeContainer>
    );
};

interface IState {
    products: { [key: string]: IData[] };
}

const mapStateToProps = (state: IState) => ({
    results: state.products.featured
});

const actionCreators = {
    populateProducts
};

export default connect(
    mapStateToProps,
    actionCreators
)(HomePage);
