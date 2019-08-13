import React, { useState, useEffect } from "react";
import FeaturedCarousel from "../components/Carousel";
import styled from "styled-components";
import useDatabase from "../hooks/useDatabase";
import useMapProductData from "../hooks/useMapProductData";
import HomeJumbotron from "../components/HomeJumbotron";

const HomeContainer = styled.div`
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
`;

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<any>(null);
    const data: any = {
        type: "Featured",
        products: useDatabase("search")
    };
    const mapped = useMapProductData(data);

    useEffect(() => {
        setFeaturedProducts(mapped);
    }, [data]);
    return (
        <HomeContainer>
            <HomeJumbotron />
            <FeaturedCarousel products={featuredProducts} />
        </HomeContainer>
    );
};

export default Home;
