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
    cartRef: React.RefObject<HTMLDivElement>;
    setIsCartPopulated(bool: boolean): void;
}

const CartItems: React.FC<IProps> = ({ shoppingCart, windowWidth, setIsCartPopulated, cartRef }) => {
    const [items, setItems] = useState<React.ReactElement[]>([]);
    const [emptyCartMargin, setEmptyCartMargin] = useState(0);

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

    useEffect(() => {
        // setting margin for top of empty cart message
        if (cartRef.current) {
            const { offsetHeight } = cartRef.current;
            const emptyCartHeight = 130;
            const oneRem = 16; // compensate for modal body padding
            setEmptyCartMargin((offsetHeight - emptyCartHeight) / 2 - oneRem);
        }
    }, [cartRef, setEmptyCartMargin, windowWidth]);

    return (
        <CartItemsContainer margin={emptyCartMargin} items={items}>
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

interface IStyleProps {
    margin: number;
    items: React.ReactChild[];
}

const CartItemsContainer = styled.div<IStyleProps>`
    margin-top: ${props => (props.items.length ? 0 : props.margin)}px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

const EmptyCartIndicator = styled.h5`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0.4;
    height: 130px;
    font-size: 100%;
`;

const StyledFrownIcon = styled(FontAwesomeIcon)`
    display: block;
    color: #42484d;
    font-size: 300%;
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
