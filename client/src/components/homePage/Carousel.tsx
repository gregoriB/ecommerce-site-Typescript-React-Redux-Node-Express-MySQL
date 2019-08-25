import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import { IData } from "../../types/types";
import mapProductData from "../../helpers/mapProductData";

interface IProps {
    products: IData[];
}

const CarouselContainer = styled.div``;

const FeaturedCarousel: React.FC<IProps> = ({ products }) => {
    const [items, setItems] = useState();
    useEffect(() => {
        const featured = mapProductData({ type: "FeaturedCard", products });
        featured &&
            setItems(
                featured.map((product: React.ReactChild, index: number) => {
                    if (index % 2 !== 0) return null;
                    return (
                        <Carousel.Item key={index}>
                            {product}
                            {index + 1 <= featured.length && featured[index + 1]}
                        </Carousel.Item>
                    );
                })
            );
    }, [setItems, products]);

    return (
        <Carousel interval={3000} as={CarouselContainer}>
            {items}
        </Carousel>
    );
};

export default FeaturedCarousel;
