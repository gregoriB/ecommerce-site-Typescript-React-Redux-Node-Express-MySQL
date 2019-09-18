import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { IShoppingCart, IShoppingCartItems } from "../../types/generalTypes";

interface IProps {
    shoppingCart: IShoppingCart;
}

const TotalPrice: React.FC<IProps> = ({ shoppingCart }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        Object.values(shoppingCart).forEach(({ price, qty }: IShoppingCartItems) => {
            if (qty && price) {
                newTotal += qty * price;
            }
        });
        setTotal(newTotal);
    }, [shoppingCart]);
    return (
        <TotalPriceContainer>
            <TotalPriceBanner>Total:</TotalPriceBanner>${total}
        </TotalPriceContainer>
    );
};

interface IState {
    shoppingCart: IShoppingCart;
}

const mapStateToProps = (state: IState) => ({
    shoppingCart: state.shoppingCart
});

export default connect(mapStateToProps)(TotalPrice);

/* ~~~~~~ -- styling -- ~~~~~~ */

const TotalPriceContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 4vw;
    align-self: flex-end;
`;

const TotalPriceBanner = styled.p`
    margin: 0;
    margin-right: 1rem;
    color: #42484d;
    font-weight: 600;
`;
