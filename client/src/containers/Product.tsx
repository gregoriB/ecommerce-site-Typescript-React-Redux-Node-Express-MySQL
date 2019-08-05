import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addToCart, IActionAdd } from "../actions/addToCart";

const ProductContainer = styled.div`
    background: red;
    height: 25rem;
`;

interface IProps {
    index: number;
    image: string;
    title: string;
    desc: string;
    price: number;
    addToCart(val: number): IActionAdd;
}

const Product: React.FC<IProps> = ({
    image,
    title,
    desc,
    price,
    addToCart,
    index
}) => {
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
                        width: "unset",
                        maxHeight: "40%",
                        margin: ".5rem"
                    }}
                    variant="top"
                    src={image}
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
                    </Card.Text>
                    <Card.Text style={{ fontSize: ".7rem" }}>
                        ${price}
                    </Card.Text>
                    <Button
                        variant="primary"
                        // style={{ position: "absolute", bottom: ".7rem" }}
                        onClick={() => addToCart(index)}
                    >
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
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
