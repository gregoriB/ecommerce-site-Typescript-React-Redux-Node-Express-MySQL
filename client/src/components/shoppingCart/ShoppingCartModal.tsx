import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import QuantitySettings from "./QuantitySettings";
import TotalPrice from "./TotalPrice";

const ShoppingCartModal: React.FC<any> = ({ shoppingCart, onHide, show }) => {
    const [items, setItems] = useState<(React.ReactElement)[]>([]);

    useEffect(() => {
        shoppingCart &&
            setItems(
                Object.entries(shoppingCart).map(([product, { price, qty, stock }]: any) => {
                    return (
                        <ProductContainer key={product}>
                            <ProductName>{product}</ProductName>
                            <InputsContainer>
                                <PriceAndQty>
                                    <PriceContainer>
                                        price: <span>${price}</span>
                                    </PriceContainer>
                                    qty:
                                </PriceAndQty>
                                <QuantitySettings
                                    product={product}
                                    quantity={qty}
                                    price={price}
                                    stock={stock}
                                />
                            </InputsContainer>
                        </ProductContainer>
                    );
                })
            );
    }, [shoppingCart]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size={Object.values(shoppingCart).length ? "xl" : "lg"}
            aria-labelledby="contained-modal-title-right"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 ? (
                    <div>
                        <div>{items}</div>
                        <TotalPrice />
                    </div>
                ) : (
                    <div>
                        <h4>Your cart is empty</h4>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {items.length > 0 ? (
                    <Link to="checkout" onClick={onHide}>
                        Go to checkout
                    </Link>
                ) : (
                    <Button variant="outline-secondary" onClick={onHide}>
                        Close
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

interface IState {
    shoppingCart: any;
}

const mapStateToProps = (state: IState) => ({
    shoppingCart: state.shoppingCart.cart
});

export default connect(mapStateToProps)(ShoppingCartModal);

const ProductContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid transparent;
    border-bottom-color: #dee2e6;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
`;

const InputsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 30%;
    form .form-control {
        width: 100%;
    }
    div {
        width: 15%;
        button {
            padding: 0;
        }
    }
`;

const PriceAndQty = styled.span`
    display: flex;
    justify-content: space-between;
    word-wrap: none;
    white-space: nowrap;
    width: 100%;
`;

const ProductName = styled.div`
    width: 55%;
`;

const PriceContainer = styled.div`
    display: flex;
    span {
        margin-left: 1rem;
    }
`;
