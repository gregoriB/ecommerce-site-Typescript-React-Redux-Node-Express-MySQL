import React, { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { IActionPopulate } from "../types/types";
import useDatabase from "../hooks/useDatabase";
import populateProducts from "../store/actions/populateProducts";
import FeaturedCarousel from "../components/Carousel";
import HomeJumbotron from "../components/HomeJumbotron";

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
        (!featured || featured.length < 1) && populateProducts(actionProps);
    });
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel products={featured} />
        </HomeContainer>
    );
};

interface IState {
    products: {
        [key: string]: IData[];
    };
}

const mapStateToProps = ({ products }: IState) => ({
    featured: products.featured
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    populateProducts: (props: IData[]) => dispatch(populateProducts(props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
