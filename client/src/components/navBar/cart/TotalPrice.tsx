import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TotalPrice: React.FC<any> = ({ cart }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        Object.values(cart).forEach((product: any) => {
            newTotal += product.qty * product.price;
        });
        setTotal(newTotal);
    }, [cart]);
    return (
        <TotalPriceContainer>
            <TotalPriceBanner>Total:</TotalPriceBanner>${total}
        </TotalPriceContainer>
    );
};

export default TotalPrice;

const TotalPriceContainer = styled.div`
    display: flex;
    width: 100%;
`;

const TotalPriceBanner = styled.p`
    margin: 0;
    margin-left: 69.7%;
    margin-right: 1rem;
    font-weight: 600;
`;
