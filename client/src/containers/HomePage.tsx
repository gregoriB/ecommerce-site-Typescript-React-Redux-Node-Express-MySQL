import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IActionPopulate } from "../types/types";
import useDatabase from "../hooks/useDatabase";
import FeaturedCarousel from "../components/Carousel";
import HomeJumbotron from "../components/HomeJumbotron";

interface IData {
    imageURL: string;
    name: string;
    descShort: string;
    descLong: string;
    price: number;
}

interface IState {
    products: {
        [key: string]: IData[];
    };
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

const Home: React.FC<IProps> = () => {
    const featured = useSelector((state: IState) => state.products.featured)
    const dispatch = useDispatch();
    const data: IData[] = useDatabase("search");
    const actionProps: any = { type: "FEATURED", payload: data };
    useEffect(() => {
        (!featured || featured.length < 1) && dispatch(actionProps);
    });
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel products={featured} />
        </HomeContainer>
    );
};

export default Home;