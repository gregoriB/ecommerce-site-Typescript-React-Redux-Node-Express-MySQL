import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import ProductModal from "./ProductModal";

interface IProps {
    index: number;
    image: string;
    title: string;
    desc: string;
    descLong: string;
    price: number;
}

const FeaturedContainer = styled.div`
    margin: 2%;
    /* margin-bottom: 0; */
    width: 30%;
    max-width: 500px;
    :nth-of-type(1) {
        width: 60%;
        max-width: 700px;
        /* margin-bottom: 2%; */
    }
    &:nth-of-type(4n) {
        width: 60%;
        max-width: 700px;
        /* margin-bottom: 2%; */
    }
`;

const Featured: React.FC<IProps> = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { image, title, desc, price, index } = props;
    return (
        <FeaturedContainer>
            <Card>
                <Card.Header>
                    ${price}
                    <div>{title}</div>
                </Card.Header>
                <Card.Body style={{ textAlign: "center" }}>
                    <Card.Img
                        src={image}
                        style={{
                            width: "80%",
                            marginBottom: "1rem"
                        }}
                    />
                    <Button
                        variant="outline-primary"
                        onClick={() => setIsModalOpen(true)}
                        style={{ marginTop: "auto" }}
                    >
                        Check it out
                    </Button>
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
