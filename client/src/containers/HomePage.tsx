import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { IActionPopulate, IData } from "../types/types";
// import useDatabase from "../hooks/useDatabase";
import queryDatabase from "../helpers/queryDatabase";
import FeaturedCarousel from "../components/homePage/Carousel";
import HomeJumbotron from "../components/homePage/HomeJumbotron";
import populateProducts from "../store/actions/populateProducts";

// interface IData {
//     imageURL: string;
//     name: string;
//     descShort: string;
//     descLong: string;
//     price: number;
// }

interface IState {
    products: {
        [key: string]: IData[];
    };
}

interface IProps {
    results: IData[];
    populateProducts(data: IData[]): IActionPopulate;
}

const HomeContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
`;

const Home: React.FC<IProps> = ({ populateProducts, results }) => {
    useEffect(() => {
        (async () => {
            const dbQuery = { path: "featured", query: "*" };
            const data: IData[] = await queryDatabase(dbQuery);
            const actionProps: any = { type: "FEATURED RESULTS", payload: data };
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (val: IData[]) => dispatch(populateProducts(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
