import React, { useState, useEffect } from "react";
import Featured from "./Featured";
import styled from "styled-components";
import { Jumbotron, Button } from "react-bootstrap";

const FeaturedItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
`;

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:34567/featured");
                const featuredList: any = await response.json();
                featuredList &&
                    setFeaturedProducts(
                        featuredList.map((item: any, index: number) => {
                            return (
                                <Featured
                                    key={index}
                                    index={index}
                                    image={item.imageURL}
                                    title={item.name}
                                    desc={item.shortDescription}
                                    descLong={item.longDescription}
                                    price={item.price}
                                />
                            );
                        })
                    );
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div>
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
        </div>
    );
};

export default Home;
