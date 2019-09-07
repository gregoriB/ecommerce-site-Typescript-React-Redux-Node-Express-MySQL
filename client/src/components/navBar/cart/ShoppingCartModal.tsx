import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import QuantitySettings from "./QuantitySettings";
import { IData } from "../../../types/types";
import TotalPrice from "./TotalPrice";

interface IProps {
    cart: Object;
    // show: boolean;
    // onHide(): void;
    updateQuantity(val: any): any;
}

const ShoppingCartModal: React.FC<any> = ({ cart, onHide, updateQuantity, show, removeFromCart }) => {
    const [items, setItems] = useState<(React.ReactElement)[]>([]);

    useEffect(() => {
        cart &&
            setItems(
                Object.entries(cart).map(([product, { price, qty, stock }]: any) => {
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
                                    updateQuantity={updateQuantity}
                                    price={price}
                                    stock={stock}
                                    removeFromCart={removeFromCart}
                                />
                            </InputsContainer>
                        </ProductContainer>
                    );
                })
            );
    }, [cart, updateQuantity]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size={Object.values(cart).length ? "xl" : "lg"}
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
                        <TotalPrice cart={cart} />
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

export default ShoppingCartModal;

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
