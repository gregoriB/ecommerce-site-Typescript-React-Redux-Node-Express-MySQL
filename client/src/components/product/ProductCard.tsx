import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import ProductModal from "./ProductModal";
import ProductImage from "./ProductImage";
import BtnAddToCart from "../shoppingCart/BtnAddToCart";
import { IProduct, IFilters } from "../../types/generalTypes";

export interface IProps {
    categories: string[];
    miscProps: IFilters;
}

const ProductCard: React.FC<IProduct & IProps> = props => {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { imageURL, itemName, descShort, price, categories, miscProps, stock } = props;
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
            const categoryArray = categories;
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
                    <StyledCardTitle>{itemName}</StyledCardTitle>
                    <StyledDescriptionText>
                        {shortenDescription()}
                        <ShowMoreLink onClick={() => setIsProductModalOpen(true)}>
                            Click to read more
                        </ShowMoreLink>
                    </StyledDescriptionText>
                    <PriceAndBtnContainer>
                        {/* <StyledPriceText>${price}</StyledPriceText> */}
                        <ButtonContainer>
                            <BtnAddToCart
                                itemName={itemName}
                                price={price}
                                stock={stock}
                                text={`$${price} - add to cart`}
                            />
                        </ButtonContainer>
                    </PriceAndBtnContainer>
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

/* ~~~~~~ -- styling -- ~~~~~~ */

const ProductContainer = styled.div`
    height: 25rem;
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
    transition: box-shadow 0.2s;
    :hover {
        box-shadow: 0 3px 10px #42484d55;
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
    &.card-title {
        color: #42484d;
        font-size: 1rem;
    }
`;
const StyledDescriptionText = styled(Card.Text)`
    color: #42484d;
    font-size: 0.7rem;
    font-style: italic;
    text-align: justify;
`;

const ButtonContainer = styled.div``;

const PriceAndBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ShowMoreLink = styled.button`
    font-size: 0.8rem;
    font-weight: 500;
    color: #007bff;
    border: none;
    background: none;
    display: block;
    text-decoration: underline;
    margin: 5px auto;
`;
