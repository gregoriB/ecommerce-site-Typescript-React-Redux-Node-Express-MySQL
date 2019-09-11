import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import mapProductData from "../../helpers/mapProductData";
import { IProduct } from "../../types/generalTypes";
import { stdBreakPoint } from "../../helpers/breakPoints";

interface IProps {
    products: IProduct[];
}

const FeaturedCarousel: React.FC<IProps> = ({ products }) => {
    const [items, setItems] = useState();
    useEffect(() => {
        const mapFeatured = () => {
            const featured = mapProductData({ component: "FeaturedCard", products });
            featured &&
                setItems(
                    featured.map((product: React.ReactChild, index: number) => {
                        //if on mobile or small display, map 1 featured item per carousel item, otherwise map 2.
                        if (index % 2 !== 0 && window.innerWidth > 992) return null;
                        return (
                            <StyledCarouselItem key={index}>
                                {product}
                                {window.innerWidth > 992 &&
                                    index + 1 <= featured.length &&
                                    featured[index + 1]}
                            </StyledCarouselItem>
                        );
                    })
                );
        };
        mapFeatured();
        window.addEventListener("resize", mapFeatured);
        return () => {
            window.removeEventListener("resize", mapFeatured);
        };
    }, [setItems, products]);

    return <StyledCarousel interval={3000}>{items}</StyledCarousel>;
};

interface IState {
    products: { [key: string]: IProduct[] };
}

const mapStateToProps = (state: IState) => ({
    products: state.products.featured
});

export default connect(mapStateToProps)(FeaturedCarousel);

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledCarousel = styled(Carousel)`
    display: flex;
    .carousel {
        display: flex;
    }
    .carousel-inner {
        display: flex;
        width: 100%;
    }
    .carousel-item {
        width: 100%;
        justify-content: center;
    }
    .carousel-item-left {
        display: inline-flex;
        width: 100%;
    }
    .carousel-item-right {
        display: inline-flex;
        width: 100%;
    }
    .carousel-item.active {
        width: 100%;
        display: inline-flex;
        justify-content: center;
    }
    .carousel-control-prev-icon {
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.2);
        background-size: 50%;
        background-position: 45%;
        border-radius: 50%;
        @media (max-width: ${stdBreakPoint}px) {
            display: none;
        }
    }
    .carousel-control-next-icon {
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.2);
        background-size: 50%;
        background-position: 55%;
        border-radius: 50%;
        @media (max-width: ${stdBreakPoint}px) {
            display: none;
        }
    }
    .carousel-indicators li {
        background: rgba(0, 0, 0, 0.4);
        height: 10px;
        border: none;
    }
`;

const StyledCarouselItem = styled(Carousel.Item)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: unset;
    .card {
        height: 350px;
    }
`;
