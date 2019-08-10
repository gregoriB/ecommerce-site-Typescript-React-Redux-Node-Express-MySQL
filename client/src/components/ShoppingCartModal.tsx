import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import products from "../data/products";

interface IProps {
    cart: Object;
    show: boolean;
    onHide(): void;
}

const ShoppingCartModal: React.FC<IProps> = props => {
    const { cart, onHide } = props;
    const [items, setItems] = useState<React.ReactElement[]>([]);
    const [total, setTotal] = useState();

    const submitOrder = async () => {
        try {
            const response = await fetch("http://localhost:34567", {
                method: "POST",
                body: JSON.stringify({ cart }),
                headers: { "Content-Type": "applications/json" }
            });
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let total = 0;
        setItems(
            Object.entries(cart).map(([product, quantity], index) => {
                const { title, price } = products[Number(product)];
                total += price * Number(quantity);
                return (
                    <div key={index}>
                        {title} x {quantity} @ ${price} each
                    </div>
                );
            })
        );

        setTotal(total);
    }, [cart]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-right"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Shopping Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 ? (
                    <div>
                        <h4>Your Items:</h4>
                        <div>{items}</div>
                        <hr />
                        <div>Total: ${total}</div>
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
