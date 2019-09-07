import React, { useState, useEffect, useRef } from "react";
import { FormControl } from "react-bootstrap";
import styled from "styled-components";
import BtnRemoveFromCart from "../../../containers/BtnRemoveFromCart";

interface IProps {
    quantity: number;
    product: string;
    updateQuantity(val: any): any;
}

const QuantityInput: React.FC<any> = ({
    quantity,
    product,
    updateQuantity,
    price,
    stock,
    removeFromCart
}) => {
    const [inputValue, setInputValue] = useState(quantity);
    type keyboardEvent = React.ChangeEvent<EventTarget>;
    const handleChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        if (target.value > stock) return;
        setInputValue(target.value);
    };

    const handleBlur = () => {
        if (inputValue > 0) return;

        removeFromCart(product);
    };
    useEffect(() => {
        updateQuantity({ name: product, qty: Number(inputValue) });
    }, [inputValue]);
    return (
        <>
            <StyleFormControl
                type="number"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                min={0}
                max={stock}
            />
            <ButtonContainer>
                <BtnRemoveFromCart
                    price={price}
                    stock={stock}
                    itemName={product}
                    text={""}
                    title="click to remove this item from your shopping cart"
                />
            </ButtonContainer>
        </>
    );
};

export default QuantityInput;

const StyleFormControl = styled(FormControl)`
    &.form-control {
        padding: 0.25rem;
        width: 25%;
        margin: 0 1rem;
        margin-right: 2rem;
    }
`;

const ButtonContainer = styled.div`
    width: 30px;
`;
