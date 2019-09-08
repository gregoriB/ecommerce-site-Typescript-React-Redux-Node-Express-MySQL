import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { addOneToCart, addToast } from "../../store/actions/actionCreators";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toast from "../toasts/Toast";
import uuid from "uuid";

const BtnAddToCart: React.FC<any> = ({
    shoppingCart,
    addOneToCart,
    itemName,
    stock,
    price,
    addToast
}) => {
    const checkIfOutOfStock = useCallback(() => {
        return shoppingCart[itemName] && shoppingCart[itemName].qty >= stock;
    }, [shoppingCart, itemName, stock]);

    const [isDisabled, setIsDisabled] = useState(checkIfOutOfStock());
    const handleButtonClick = () => {
        const product = { itemName, attributes: { price, stock } };
        if (checkIfOutOfStock()) {
            setIsDisabled(true);
            return;
        }
        addOneToCart(product);
        addToast(<Toast key={uuid()} itemName={itemName} />);
    };

    useEffect(() => {
        setIsDisabled(checkIfOutOfStock());
    }, [checkIfOutOfStock]);

    return (
        <StyledButton
            disabled={isDisabled}
            onClick={handleButtonClick}
            variant="outline-primary"
            title="Add item to your shopping shoppingCart"
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
}

const mapStateToProps = (state: IState) => ({
    shoppingCart: state.shoppingCart.cart
});

const actionCreators = {
    addOneToCart,
    addToast
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
