import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addToCart } from "../actions/addToCart";

const ProductContainer = styled.div`
    /* height: 50vh; */
`;

interface IProps {
    index: number;
    title: string;
    desc: string;
    price: number;
    addToCart(val: number): any;
}

const Product: React.FC<IProps> = ({
    title,
    desc,
    price,
    addToCart,
    index
}) => {
    return (
        <ProductContainer>
            <Card
                style={{
                    width: "18rem",
                    height: "25rem",
                    margin: "1rem",
                    marginTop: "0",
                    marginLeft: "0"
                }}
            >
                <Card.Img
                    variant="top"
                    src="https://www.templaza.com/blog/components/com_easyblog/themes/wireframe/images/placeholder-image.png"
                />
                <Card.Body style={{ padding: ".5rem" }}>
                    <Card.Title style={{ fontSize: "1rem" }}>
                        {title}
                    </Card.Title>
                    <Card.Text style={{ fontSize: ".7rem" }}>{desc}</Card.Text>
                    <Card.Text style={{ fontSize: ".7rem" }}>
                        ${price}
                    </Card.Text>
                    <Button
                        variant="primary"
                        style={{ position: "absolute", bottom: ".7rem" }}
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
