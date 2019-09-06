import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { addOneToCart, removeAllFromCart } from "../store/actions/actionCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    add?: boolean;
    title?: string;
    text: string;
    subtract?: boolean;
    cart: any;
    itemName: string;
    results: any;
    isDisabled?: boolean;
    addOneToCart(val: any): any;
    removeAllFromCart(val: any): any;
}

const ButtonChangeCart: React.FC<IProps> = ({
    add,
    addOneToCart,
    removeAllFromCart,
    text,
    itemName,
    isDisabled,
    title
}) => {
    const handleButtonClick = () => {
        add ? addOneToCart(itemName) : removeAllFromCart(itemName);
    };

    return (
        <StyledButton
            disabled={isDisabled}
            onClick={handleButtonClick}
            variant={add ? "primary" : "outline-danger"}
            title={title}
            style={{ borderColor: !text && "transparent" }}
        >
            {text}
            <StyledCartIcon icon={add ? "cart-plus" : "times"} />
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
    removeAllFromCart
};

export default connect(
    mapStateToProps,
    actionCreators
)(ButtonChangeCart);

/* ~~~~~~ -- styling -- ~~~~~~ */
const StyledButton = styled(Button)`
    width: 100%;
    /* height: 100%; */
`;

const StyledCartIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;
