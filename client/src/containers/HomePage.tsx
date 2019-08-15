import React, { useEffect } from "react";
import FeaturedCarousel from "../components/Carousel";
import styled from "styled-components";
import useDatabase from "../hooks/useDatabase";
import HomeJumbotron from "../components/HomeJumbotron";
import populateProducts from "../store/actions/populateProducts";
import { IState } from "../store/reducers/populateProducts/populateProducts";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IActionPopulate } from "../types/types";

interface IData {
    imageURL: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    price: number;
}

interface IProps {
    featured: IData[];
    populateProducts(data: IData[]): IActionPopulate;
}

const HomeContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
`;

const Home: React.FC<IProps> = ({ populateProducts, featured }) => {
    const data: IData[] = useDatabase("search");
    const actionProps: any = { type: "FEATURED", payload: data };
    useEffect(() => {
        populateProducts(actionProps);
    });
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel products={featured} />
        </HomeContainer>
    );
};

const mapStateToProps = (state: IState) => ({
    featured: state.featured
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (props: any) => dispatch(populateProducts(props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
