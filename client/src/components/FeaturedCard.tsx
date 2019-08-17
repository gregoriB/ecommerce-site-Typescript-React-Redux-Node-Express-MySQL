import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import ProductModal from "./ProductModal";
import ProductImage from "./ProductImage";
import { IData as IProps } from "../types/types";

const FeaturedContainer = styled.div`
    cursor: pointer;
    margin: 0 1rem;
    width: 60%;
    :nth-of-type(even) {
        width: 30%;
    }
`;

type mouseClick = React.MouseEvent<HTMLElement>;

const FeaturedCard: React.FC<IProps> = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClick = (e: mouseClick) => {
        isModalOpen && e.preventDefault();
        setIsModalOpen(true);
    };
    const { imageURL, name, price } = props;
    return (
        <FeaturedContainer>
            <Card onClick={handleClick}>
                <Card.Header style={{ borderRadius: 0 }}>
                    ${price}
                    <div>{name}</div>
                </Card.Header>
                <Card.Body style={{ textAlign: "center" }}>
                    <ProductImage allowModal={false} image={imageURL} />
                </Card.Body>
            </Card>
            <ProductModal {...props} show={isModalOpen} onHide={() => setIsModalOpen(false)} />
        </FeaturedContainer>
    );
};

export default FeaturedCard;
