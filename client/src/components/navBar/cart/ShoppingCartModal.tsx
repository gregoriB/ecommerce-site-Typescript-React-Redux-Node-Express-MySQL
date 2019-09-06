import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import QuantitySettings from "./QuantitySettings";

interface IProps {
    cart: Object;
    show: boolean;
    onHide(): void;
    updateQuantity(val: any): any;
}

const ShoppingCartModal: React.FC<IProps> = ({ cart, onHide, updateQuantity, show }) => {
    const [items, setItems] = useState<(React.ReactElement)[]>([]);
    // const [total, setTotal] = useState();

    useEffect(() => {
        // let total = 0;
        // setItems(
        //     Object.entries(cart).map(([product, quantity], index) => {
        //         const { title, price } = products[Number(product)];
        //         total += price * Number(quantity);
        //         return (
        //             <div key={index}>
        //                 {title} x {quantity} @ ${price} each
        //             </div>
        //         );
        //     })
        // );

        cart &&
            setItems(
                Object.entries(cart).map(([product, quantity]) => {
                    return (
                        quantity && (
                            <ProductContainer key={product}>
                                <ProductName>{product}</ProductName>
                                <InputsContainer>
                                    <span>qty: </span>
                                    <QuantitySettings
                                        product={product}
                                        quantity={quantity}
                                        updateQuantity={updateQuantity}
                                    />
                                </InputsContainer>
                            </ProductContainer>
                        )
                    );
                })
            );

        // setTotal(total);
    }, [cart, updateQuantity]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-right"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 ? (
                    <div>
                        <h4>Your Items:</h4>
                        <div>{items}</div>
                        <div>Total: $100</div>
                    </div>
                ) : (
                    <div>
                        <h4>Your cart is empty</h4>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {items.length > 0 && (
                    <Link to="checkout" onClick={onHide}>
                        Go to checkout
                    </Link>
                )}
                <Button onClick={onHide}>Close</Button>
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
`;

const InputsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 30%;
    form .form-control {
        width: 100%;
        /* max-width: 30%; */
    }
    span {
        /* width: 30%; */
    }
    div {
        width: 15%;
        button {
            padding: 0;
        }
    }
`;

const ProductName = styled.div`
    width: 65%;
`;
