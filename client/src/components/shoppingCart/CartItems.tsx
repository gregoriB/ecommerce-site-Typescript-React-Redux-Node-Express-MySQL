import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IShoppingCart, IShoppingCartItems } from "../../types/generalTypes";
import { stdBreakPoint } from "../../helpers/breakPoints";
import QuantityInput from "./QuantityInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    shoppingCart: IShoppingCart;
    windowWidth: number;
    setIsCartPopulated(bool: boolean): void;
}

const CartItems: React.FC<IProps> = ({ shoppingCart, windowWidth, setIsCartPopulated }) => {
    const [items, setItems] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const mapCartItems = () => {
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
        };
        if (Object.keys(shoppingCart).length) {
            mapCartItems();
            setIsCartPopulated(true);
        } else {
            setItems([]);
            setIsCartPopulated(false);
        }
    }, [shoppingCart, windowWidth, setIsCartPopulated]);

    return (
        <CartItemsContainer>
            {items.length ? (
                items
            ) : (
                <EmptyCartIndicator>
                    Your Cart is Empty
                    <StyledFrownIcon icon="frown" />
                </EmptyCartIndicator>
            )}
        </CartItemsContainer>
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

export default connect(mapStateToProps)(CartItems);

/* ~~~~~~ -- styling -- ~~~~~~ */

const CartItemsContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const EmptyCartIndicator = styled.h5`
    margin-top: 1rem;
    text-align: center;
    opacity: 0.4;
`;

const StyledFrownIcon = styled(FontAwesomeIcon)`
    display: block;
    color: #42484d;
    font-size: 4rem;
    margin: 0 auto;
    margin-top: 1rem;
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
