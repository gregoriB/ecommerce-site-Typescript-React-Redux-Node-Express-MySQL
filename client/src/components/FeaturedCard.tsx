import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import ProductModal from "./ProductModal";
import ProductImage from "./ProductImage";

interface IProps {
    index: number;
    image: string;
    title: string;
    desc: string;
    descLong: string;
    price: number;
}

const FeaturedContainer = styled.div`
    cursor: pointer;
    margin: 0 1rem;
    width: 60%;
    :nth-of-type(even) {
        width: 30%;
    }
`;

const FeaturedCard: React.FC<IProps> = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClick = (e: any) => {
        isModalOpen && e.preventDefault();
        setIsModalOpen(true);
    };
    const { image, title, price } = props;
    return (
        <FeaturedContainer>
            <Card onClick={handleClick}>
                <Card.Header style={{ borderRadius: 0 }}>
                    ${price}
                    <div>{title}</div>
                </Card.Header>
                <Card.Body style={{ textAlign: "center" }}>
                    <ProductImage allowModal={false} image={image} />
                </Card.Body>
            </Card>
            <ProductModal
                {...props}
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </FeaturedContainer>
    );
};

export default FeaturedCard;
