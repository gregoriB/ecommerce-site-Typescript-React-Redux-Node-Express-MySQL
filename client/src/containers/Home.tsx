import React, { useState, useEffect } from "react";
import Featured from "../components/FeaturedItems";
import styled from "styled-components";
import { Jumbotron, Button } from "react-bootstrap";
import useDatabase from "../hooks/useDatabase";
import useMapProductData from "../hooks/useMapProductData";

const FeaturedItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
`;

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<any>(null);
    const data: any = {
        type: "Featured",
        products: useDatabase("featured")
    };
    const mapped = useMapProductData(data);

    useEffect(() => {
        setFeaturedProducts(mapped);
    }, [data]);
    return (
        <>
            <Jumbotron style={{ background: "white", padding: "5vh 15vw" }}>
                <h1>It's the end of the year sales event!</h1>
                <p>
                    Sales on quality arcade stick parts and accessories from
                    manufactures like Hori and Brook.
                </p>
                <p>
                    <Button variant="outline-secondary">
                        Check out more sale items
                    </Button>
                </p>
            </Jumbotron>
            <FeaturedItems>{featuredProducts}</FeaturedItems>
        </>
    );
};

export default Home;
