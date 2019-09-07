import React from "react";
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

const BtnRemoveFromCart: React.FC<any> = ({ removeFromCart, itemName }) => {
    const handleButtonClick = () => {
        removeFromCart(itemName);
    };

    return (
        <StyledButton
            onClick={handleButtonClick}
            variant="outline-danger"
            title="Click to remove this item for your shopping cart"
            style={{ borderColor: "transparent" }}
        >
            <StyledCartIcon icon="times" />
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
)(BtnRemoveFromCart);

/* ~~~~~~ -- styling -- ~~~~~~ */
const StyledButton = styled(Button)`
    width: 100%;
`;

const StyledCartIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;
