import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IActionPopulate } from "../types/types";
import useDatabase from "../hooks/useDatabase";
import queryDatabase from "../helpers/queryDatabase";
import FeaturedCarousel from "../components/homePage/Carousel";
import HomeJumbotron from "../components/homePage/HomeJumbotron";

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
    const featured = useSelector((state: IState) => state.products.featured);
    const dispatch = useDispatch();
    const dbQuery = { path: "featured", query: "*" };
    const data: IData[] = useDatabase(dbQuery);
    const actionArgs: any = { type: "FEATURED RESULTS", payload: data };
    useEffect(() => {
        (!featured || featured.length < 1) && dispatch(actionArgs);
    });
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel products={featured} />
        </HomeContainer>
    );
};

export default Home;
