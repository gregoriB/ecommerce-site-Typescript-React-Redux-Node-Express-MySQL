import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import products from "../data/products";

interface IProps {
    item: number;
}

const BSToast: React.FC<IProps> = ({ item }) => {
    const [showToast, setShowToast] = useState(true);
    const [display, setDisplay] = useState("block");
    const timer = 3000;

    useEffect(() => {
        window.setTimeout(() => {
            setDisplay("none");
        }, timer + 700);
    });

    return (
        <Toast
            autohide={true}
            delay={timer}
            className="fade"
            transition={false}
            show={showToast}
            onClose={() => setShowToast(!showToast)}
            style={{ display }}
        >
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Added to Cart</strong>
                <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>
                {products[item].title} added to your shopping cart
            </Toast.Body>
        </Toast>
    );
};

export default BSToast;
