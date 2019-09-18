import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";

import { stdBreakPoint } from "../../helpers/breakPoints";
import { IProduct } from "../../types/generalTypes";

import ProductModal from "../product/ProductModal";
import ProductImage from "../product/ProductImage";

const FeaturedCard: React.FC<IProduct> = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    type mouseClick = React.MouseEvent<HTMLElement>;
    const handleClick = (e: mouseClick) => {
        isModalOpen && e.preventDefault();
        setIsModalOpen(true);
    };
    const { imageURL, itemName } = props;
    return (
        <FeaturedContainer>
            <StyledCard onClick={handleClick}>
                <StyledCardHeader>{itemName}</StyledCardHeader>
                <StyledCardBody>
                    <ProductImage allowModal={false} image={imageURL} />
                </StyledCardBody>
            </StyledCard>
            <ProductModal {...props} show={isModalOpen} onHide={() => setIsModalOpen(false)} />
        </FeaturedContainer>
    );
};

export default FeaturedCard;

/* ~~~~~~ -- styling -- ~~~~~~ */

const FeaturedContainer = styled.div`
    cursor: pointer;
    margin: 0 1rem;
    width: 60%;
    :nth-of-type(even) {
        width: 30%;
    }
    @media (max-width: ${stdBreakPoint}px) {
        margin: 0;
        width: 100%;
    }
`;

const StyledCard = styled(Card)`
    margin: 0 1rem;
    height: 100%;
    transition: box-shadow 0.2s;
    :hover {
        box-shadow: 0 3px 10px #42484d55;
    }
    @media (max-width: ${stdBreakPoint}px) {
        margin: 0;
    }
`;

const StyledCardHeader = styled(Card.Header)`
    &.card-header {
        border-radius: 0;
        box-sizing: border-box;
        padding: 1rem;
        text-align: center;
    }
`;

const StyledCardBody = styled(Card.Body)`
    text-align: center;
    display: flex;
    align-items: center;
`;
