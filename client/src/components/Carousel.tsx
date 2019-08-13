import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";

interface IProps {
    products: any;
}

const CarouselContainer = styled.div``;

const FeaturedCarousel: React.FC<IProps> = ({ products }) => {
    const [items, setItems] = useState();
    const [modalState, setModalState] = useState<number | null>(null);
    useEffect(() => {
        products &&
            setItems(
                products.map((product: any, index: number) => {
                    if (index % 2 !== 0) return null;

                    return (
                        <Carousel.Item key={index}>
                            {product}
                            {index + 1 && products[index + 1]}
                        </Carousel.Item>
                    );
                })
            );
    });

    return (
        <Carousel interval={3000} as={CarouselContainer}>
            {items}
        </Carousel>
    );
};

export default FeaturedCarousel;
