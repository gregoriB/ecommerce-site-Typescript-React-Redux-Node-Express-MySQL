import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import TotalPrice from "./TotalPrice";
import { IShoppingCart, IModalToggle } from "../../types/generalTypes";
import { stdBreakPoint } from "../../helpers/breakPoints";
import CartItems from "./CartItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    windowWidth: number;
    shoppingCart: IShoppingCart;
    hideNav(): void;
}

const ShoppingCartModal: React.FC<IProps & IModalToggle & RouteComponentProps> = ({
    shoppingCart,
    onHide,
    show,
    hideNav,
    history,
    windowWidth
}) => {
    const [isCartPopulated, setIsCartPopulated] = useState(false);
    const navigateToCheckoutPage = () => {
        onHide();
        hideNav();
        history.push(`/checkout`);
    };

    return (
        <StyledModal
            show={show}
            onHide={onHide}
            size={windowWidth > 992 ? (Object.values(shoppingCart).length ? "xl" : "lg") : null}
            aria-labelledby="contained-modal-title-right"
            centered
        >
            <Modal.Header closeButton>
                <StyledModalTitle id="contained-modal-title-vcenter">
                    <FontAwesomeIcon icon="shopping-cart" />
                    <div>Shopping Cart</div>
                </StyledModalTitle>
            </Modal.Header>
            <StyledModalBody>
                <CartItems setIsCartPopulated={setIsCartPopulated} />
                {isCartPopulated && <TotalPrice />}
            </StyledModalBody>
            <Modal.Footer>
                {isCartPopulated ? (
                    <LinkToCheckout onClick={navigateToCheckoutPage}>Go to checkout</LinkToCheckout>
                ) : (
                    <Button variant="outline-secondary" onClick={onHide}>
                        Close
                    </Button>
                )}
            </Modal.Footer>
        </StyledModal>
    );
};

interface IState {
    shoppingCart: IShoppingCart;
    windowSize: { windowWidth: number };
}

const mapStateToProps = (state: IState) => ({
    shoppingCart: state.shoppingCart,
    windowWidth: state.windowSize.windowWidth
});

export default connect(mapStateToProps)(withRouter(ShoppingCartModal));

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledModal = styled(Modal)`
    &.modal {
        @media (max-width: ${stdBreakPoint}px) {
            padding: 0 !important;
        }
        .modal-dialog {
            transition: 0.2s !important;
            @media (max-width: ${stdBreakPoint}px) {
                margin: 0 auto;
                width: 98%;
                min-width: 98%;
                max-width: 98%;
            }
        }
        .modal-content {
            min-height: 45vh;
        }
    }
`;

const StyledModalTitle = styled(Modal.Title)`
    display: flex;
    position: relative;
    align-items: center;
    color: #42484d;
    div {
        margin: 0 2rem;
        @media (max-height: ${stdBreakPoint}px) {
            font-size: 1.2rem;
        }
    }
`;

const StyledModalBody = styled(Modal.Body)`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const LinkToCheckout = styled.button`
    background: none;
    border: none;
    color: #007bff;
`;
