import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { addOneToCart, removeFromCart, addToast, removeToast } from "../store/actions/actionCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toast from "../components/navBar/cart/Toast";
import uuid from "uuid";

interface IProps {
    add?: boolean;
    title?: string;
    text: string;
    subtract?: boolean;
    cart: any;
    itemName: string;
    price: number;
    stock: number;
    results: any;
    isDisabled?: boolean;
    addOneToCart(val: any): any;
    removeFromCart(val: any): any;
}

const BtnAddToCart: React.FC<any> = ({
    cart,
    addOneToCart,
    itemName,
    stock,
    price,
    addToast,
    removeToast
}) => {
    const checkIfOutOfStock = () => {
        return cart[itemName] && cart[itemName].qty >= stock;
    };
    const [isDisabled, setIsDisabled] = useState(checkIfOutOfStock());

    const handleButtonClick = () => {
        const product = { name: itemName, attributes: { price, stock } };
        if (checkIfOutOfStock()) {
            setIsDisabled(true);
            return;
        }
        addOneToCart(product);
        addToast(<Toast key={uuid()} name={itemName} removeToast={removeToast} />);
    };

    useEffect(() => {
        setIsDisabled(checkIfOutOfStock());
    }, [cart]);

    return (
        <StyledButton
            disabled={isDisabled}
            onClick={handleButtonClick}
            variant="outline-primary"
            title="Add item to your shopping cart"
        >
            {isDisabled ? (
                "Out of Stock"
            ) : (
                <span>
                    Add to your cart <StyledCartIcon icon="cart-plus" />
                </span>
            )}
        </StyledButton>
    );
};

interface IState {
    shoppingCart: any;
    products: any;
}

const mapStateToProps = (state: IState) => ({
    cart: state.shoppingCart.cart,
    results: state.products.searchResults
});

const actionCreators = {
    addOneToCart,
    removeFromCart,
    addToast,
    removeToast
};

export default connect(
    mapStateToProps,
    actionCreators
)(BtnAddToCart);

/* ~~~~~~ -- styling -- ~~~~~~ */
const StyledButton = styled(Button)`
    width: 100%;
`;

const StyledCartIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;
