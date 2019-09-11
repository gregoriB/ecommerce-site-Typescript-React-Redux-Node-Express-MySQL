import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import QuantityInput from "./QuantityInput";
import TotalPrice from "./TotalPrice";
import { IShoppingCart, IShoppingCartItems, IModalToggle } from "../../types/generalTypes";
import { stdBreakPoint } from "../../helpers/breakPoints";

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
    const [items, setItems] = useState<React.ReactElement[]>([]);

    const navigateToCheckoutPage = () => {
        onHide();
        hideNav();
        history.push(`/checkout`);
    };
    useEffect(() => {
        shoppingCart &&
            setItems(
                Object.entries(shoppingCart).map(
                    ([product, { price, qty, stock }]: [string, IShoppingCartItems]) => (
                        <ProductContainer key={product}>
                            <ProductName>{product}</ProductName>
                            <InputsContainer>
                                <PriceContainer>
                                    price: <span>${price}</span>
                                </PriceContainer>
                                <QuantityInput itemName={product} quantity={qty!} stock={stock!} />
                            </InputsContainer>
                        </ProductContainer>
                    )
                )
            );
    }, [shoppingCart]);

    return (
        <StyledModal
            show={show}
            onHide={onHide}
            size={windowWidth > 992 ? (Object.values(shoppingCart).length ? "xl" : "lg") : null}
            aria-labelledby="contained-modal-title-right"
            dialogClassName="modal-100w"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 ? (
                    <div>
                        {items}
                        <TotalPrice />
                    </div>
                ) : (
                    <h4>Your cart is empty</h4>
                )}
            </Modal.Body>
            <Modal.Footer>
                {items.length > 0 ? (
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
    .modal-dialog {
        @media (max-width: ${stdBreakPoint}px) {
            margin: 0 auto;
            width: 98%;
            min-width: 98%;
            max-width: 98%;
        }
    }
`;

const ProductContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid transparent;
    border-bottom-color: #dee2e6;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    @media (max-width: ${stdBreakPoint}px) {
        font-size: 0.8rem;
    }
`;

const InputsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    @media (max-width: ${stdBreakPoint}px) {
        flex-direction: column-reverse;
        width: unset;
    }
`;

const ProductName = styled.div`
    width: 55%;
`;

const PriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    word-wrap: none;
    white-space: nowrap;
    span {
        margin-left: 1rem;
    }
`;

const LinkToCheckout = styled.button`
    background: none;
    border: none;
    color: #007bff;
`;
