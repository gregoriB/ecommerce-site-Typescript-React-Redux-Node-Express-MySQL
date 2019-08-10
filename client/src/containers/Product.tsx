import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addToCart, IActionAdd } from "../actions/addToCart";
import ProductModal from "../components/ProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    index: number;
    image: string;
    title: string;
    desc: string;
    descLong: string;
    price: number;
    addToCart(val: number): IActionAdd;
}

const Product: React.FC<IProps> = props => {
    const { image, title, desc, price, addToCart, index } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const shortenDescription = () => {
        const maxLength = 150;
        if (desc.length < maxLength) {
            return;
        }

        return desc.slice(0, 150).trim() + "...";
    };

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
                    border: "none",
                    borderRadius: "0"
                }}
            >
                <Card.Img
                    style={{
                        cursor: "pointer",
                        width: "unset",
                        maxHeight: "40%",
                        margin: ".5rem"
                    }}
                    variant="top"
                    src={image}
                    onClick={() => setIsModalOpen(true)}
                />
                <Card.Body
                    style={{
                        padding: ".5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        height: "60%"
                    }}
                >
                    <Card.Title style={{ fontSize: "1rem" }}>
                        {title}
                    </Card.Title>
                    <Card.Text
                        style={{ fontSize: ".7rem", textAlign: "justify" }}
                    >
                        {shortenDescription()}
                        <ShowMoreLink onClick={() => setIsModalOpen(true)}>
                            See More...
                        </ShowMoreLink>
                    </Card.Text>
                    <Card.Text style={{ fontSize: ".7rem" }}>
                        ${price}
                    </Card.Text>
                    <Button
                        variant="primary"
                        style={{ width: 200, margin: "0 auto" }}
                        onClick={() => addToCart(index)}
                    >
                        <FontAwesomeIcon
                            icon="cart-plus"
                            style={{ margin: "0 .5rem" }}
                        />
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
            <ProductModal
                {...props}
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </ProductContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return { addToCart: (val: number) => dispatch(addToCart(val)) };
};

export default connect(
    null,
    mapDispatchToProps
)(Product);
