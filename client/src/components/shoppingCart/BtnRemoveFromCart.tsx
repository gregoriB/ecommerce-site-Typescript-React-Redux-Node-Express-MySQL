import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { removeFromCart } from "../../store/actions/actionCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    itemName: string;
    removeFromCart(val: { itemName: string }): void;
}

const BtnRemoveFromCart: React.FC<IProps> = ({ removeFromCart, itemName }) => {
    const handleButtonClick = () => {
        removeFromCart({ itemName });
    };

    return (
        <StyledButton
            onClick={handleButtonClick}
            variant="outline-danger"
            title="Click to remove this item for your shopping shoppingCart"
            style={{ borderColor: "transparent" }}
        >
            <StyledCartIcon icon="times" />
        </StyledButton>
    );
};

const actionCreators = {
    removeFromCart
};

export default connect(
    null,
    actionCreators
)(BtnRemoveFromCart);

/* ~~~~~~ -- styling -- ~~~~~~ */
const StyledButton = styled(Button)`
    width: 100%;
`;

const StyledCartIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;
