import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductModal from "./modals/ProductModal";
import ProductImage from "./ProductImage";
import { IData } from "../types/types";

interface IMiscProps {
    selectedCategories: string[];
    priceRange: number[];
}

interface IProps {
    categories: string;
    miscProps: IMiscProps;
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

    if (isHidden) {
        return null;
    }

    return (
        <ProductContainer>
            <StyledCard>
                <ProductImage allowModal={true} image={imageURL} />
                <StyledCardBody>
                    <StyledCardTitle>{name}</StyledCardTitle>
                    <StyledDescriptionText>
                        {shortenDescription()}
                        <ShowMoreLink onClick={() => setIsProductModalOpen(true)}>
                            See More...
                        </ShowMoreLink>
                    </StyledDescriptionText>
                    <StyledPriceText>${price}</StyledPriceText>
                    <StyledButton variant="primary">
                        <StyledCartPlusIcon icon="cart-plus" />
                        add to cart
                    </StyledButton>
                </StyledCardBody>
            </StyledCard>
            <ProductModal
                {...props}
                show={isProductModalOpen}
                onHide={() => setIsProductModalOpen(false)}
            />
        </ProductContainer>
    );
};

export default ProductCard;

/* ~~~~~~~~~~~ -- styling -- ~~~~~~~~~~~ */
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

const StyledCard = styled(Card)`
    box-sizing: border-box;
    width: 20rem;
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    :hover {
        box-shadow: 0 3px 10px #6c757d55;
    }
`;

const StyledCardBody = styled(Card.Body)`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 60%;
`;

const StyledCardTitle = styled(Card.Title)`
    font-size: 1rem;
`;
const StyledDescriptionText = styled(Card.Text)`
    font-size: 0.7rem;
    text-align: justify;
`;

const StyledPriceText = styled(Card.Text)`
    font-weight: bold;
    font-size: 0.9rem;
    margin-left: 1rem;
`;

const StyledButton = styled(Button)`
    width: 200;
    margin: 0 auto;
`;

const StyledCartPlusIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;
