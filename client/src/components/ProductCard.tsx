import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductModal from "./modals/ProductModal";
import ProductImage from "./ProductImage";
import { IData } from "../types/types";

const ProductContainer = styled.div`
    background: red;
    height: 25rem;
`;

const ShowMoreLink = styled.button`
    border: none;
    background: none;
    text-decoration: underline;
    display: block;
    margin: 0 auto;
`;

interface IProps {
    categories: string;
    miscProps: any;
}

const ProductCard: React.FC<IData & IProps> = props => {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { imageURL, name, descShort, price, categories, miscProps } = props;
    const { selectedCategories, priceRange } = miscProps;

    const shortenDescription = () => {
        const maxLength = 150;
        if (descShort.length < maxLength) {
            return;
        }

        return descShort.slice(0, 150).trim() + "...";
    };

    useEffect(() => {
        if (categories && selectedCategories.length) {
            const categoryArray = JSON.parse(categories);
            let categoryMatches = 0;
            categoryArray.forEach((category: string) => {
                selectedCategories.includes(category) && categoryMatches++;
            });
            setIsHidden(categoryMatches ? false : true);
        }
        if (!selectedCategories.length) {
            setIsHidden(false);
        }

        const minPrice = priceRange[0] || 0;
        const maxPrice = priceRange[1] || Number.MAX_SAFE_INTEGER;

        if (price < minPrice || price > maxPrice) {
            setIsHidden(true);
        }
    }, [categories, selectedCategories, price, priceRange, setIsHidden]);

    // useEffect(() => {
    //     const minPrice = priceRange[0] || 0,
    //         maxPrice = priceRange[1] || Number.MAX_SAFE_INTEGER;
    //     setIsHidden(price < minPrice || price > maxPrice ? true : false);
    // }, [price, priceRange, setIsHidden]);

    if (isHidden) {
        return null;
    }

    return (
        <ProductContainer>
            <Card
                style={{
                    boxSizing: "border-box",
                    width: "20rem",
                    height: "100%",
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0"
                }}
            >
                <ProductImage allowModal={true} image={imageURL} />
                <Card.Body
                    style={{
                        padding: ".5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        height: "60%"
                    }}
                >
                    <Card.Title style={{ fontSize: "1rem" }}>{name}</Card.Title>
                    <Card.Text style={{ fontSize: ".7rem", textAlign: "justify" }}>
                        {shortenDescription()}
                        <ShowMoreLink onClick={() => setIsProductModalOpen(true)}>
                            See More...
                        </ShowMoreLink>
                    </Card.Text>
                    <Card.Text
                        style={{
                            fontWeight: "bold",
                            fontSize: ".9rem",
                            marginLeft: "1rem"
                        }}
                    >
                        ${price}
                    </Card.Text>
                    <Button variant="primary" style={{ width: 200, margin: "0 auto" }}>
                        <FontAwesomeIcon icon="cart-plus" style={{ margin: "0 .5rem" }} />
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
            <ProductModal
                {...props}
                show={isProductModalOpen}
                onHide={() => setIsProductModalOpen(false)}
            />
        </ProductContainer>
    );
};

export default ProductCard;
