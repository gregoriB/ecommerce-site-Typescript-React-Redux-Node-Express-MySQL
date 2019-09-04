import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import ProductModal from "../product/ProductModal";
import ProductImage from "../product/ProductImage";
import { IData } from "../../types/types";

type mouseClick = React.MouseEvent<HTMLElement>;

const FeaturedCard: React.FC<IData> = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClick = (e: mouseClick) => {
        isModalOpen && e.preventDefault();
        setIsModalOpen(true);
    };
    const { imageURL, name, price } = props;
    return (
        <FeaturedContainer>
            <StyledCard onClick={handleClick}>
                <StyledCardHeader>
                    ${price}
                    <div>{name}</div>
                </StyledCardHeader>
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
`;

const StyledCard = styled(Card)`
    margin: 0 1rem;
    height: 100%;
    :hover {
        box-shadow: 0 3px 10px #6c757d55;
    }
`;

const StyledCardHeader = styled(Card.Header)`
    border-radius: 0;
`;

const StyledCardBody = styled(Card.Body)`
    text-align: center;
`;
