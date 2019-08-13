import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addToCart, IActionAdd } from "../store/actions/addToCart";
import ProductModal from "../components/ProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductImage from "../components/ProductImage";

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

const ProductCard: React.FC<IProps> = props => {
    const { image, title, desc, price, addToCart, index } = props;
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

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
                    borderRadius: "0"
                }}
            >
                <ProductImage allowModal={true} image={image} />
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
                        <ShowMoreLink
                            onClick={() => setIsProductModalOpen(true)}
                        >
                            See More...
                        </ShowMoreLink>
                    </Card.Text>
                    <Card.Text
                        style={{
                            fontWeight: "bold",
                            fontSize: ".9rem",
                            marginLeft: "1rem"
                        }}
                    >
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
                show={isProductModalOpen}
                onHide={() => setIsProductModalOpen(false)}
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
)(ProductCard);
