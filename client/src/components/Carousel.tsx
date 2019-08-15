import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import useMapProductData from "../hooks/useMapProductData";

interface IProps {
    products: any;
}

const CarouselContainer = styled.div``;

const FeaturedCarousel: React.FC<IProps> = ({ products }) => {
    const [items, setItems] = useState();
    const featured: any = useMapProductData({ type: "FeaturedCard", products });
    useEffect(() => {
        featured &&
            setItems(
                featured.map((product: any, index: number) => {
                    if (index % 2 !== 0) return null;
                    return (
                        <Carousel.Item key={index}>
                            {product}
                            {index + 1 <= featured.length &&
                                featured[index + 1]}
                        </Carousel.Item>
                    );
                })
            );
    }, [featured, setItems, products]);

    return (
        <Carousel interval={3000} as={CarouselContainer}>
            {items}
        </Carousel>
    );
};

export default FeaturedCarousel;
