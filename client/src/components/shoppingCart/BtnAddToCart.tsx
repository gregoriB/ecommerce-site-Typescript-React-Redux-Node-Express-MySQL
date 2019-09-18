import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import uuid from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addOneToCart, addToast } from "../../store/actions/actionCreators";
import { IShoppingCart } from "../../types/generalTypes";
import { IShoppingCartPayload } from "../../types/actionTypes";

import Toast from "../toasts/Toast";

interface IProps {
    shoppingCart: { [key: string]: IShoppingCart };
    itemName: string;
    stock: number;
    price: number;
    text: string;
    addToast(child: React.ReactChild): void;
    addOneToCart(val: IShoppingCartPayload): void;
}

const BtnAddToCart: React.FC<IProps> = ({
    shoppingCart,
    addOneToCart,
    itemName,
    stock,
    price,
    addToast,
    text
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
                "Stock Limit Reached"
            ) : (
                <div>
                    {text} <StyledCartIcon icon="cart-plus" />
                </div>
            )}
        </StyledButton>
    );
};

interface IState {
    shoppingCart: {
        [key: string]: IShoppingCart;
    };
}

const mapStateToProps = (state: IState) => ({
    shoppingCart: state.shoppingCart
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
    .btn {
        width: 100%;
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const StyledCartIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;
