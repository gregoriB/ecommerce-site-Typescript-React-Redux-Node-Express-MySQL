import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
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
    /* height: 50%; */
    width: 60%;
    /* margin: 0; */
    :nth-of-type(even) {
        width: 30%;
    }
`;

const Featured: React.FC<IProps> = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClick = (e: any) => {
        isModalOpen && e.preventDefault();
        setIsModalOpen(true);
    };
    const { image, title, desc, price, index } = props;
    return (
        <FeaturedContainer>
            <Card onClick={handleClick}>
                <Card.Header style={{ borderRadius: 0 }}>
                    ${price}
                    <div>{title}</div>
                </Card.Header>
                <Card.Body style={{ textAlign: "center" }}>
                    {/* <Card.Img
                        src={image}
                        style={{
                            width: "100%",
                            height: "100%",
                            marginBottom: "0"
                        }}
                    /> */}
                    <ProductImage allowModal={false} image={image} />
                    {/* <Button
                        variant="outline-primary"
                        onClick={handleClick}
                        style={{ marginTop: "auto" }}
                    >
                        Check it out
                    </Button> */}
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

export default Featured;
