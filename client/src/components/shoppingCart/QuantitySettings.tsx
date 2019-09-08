import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { removeFromCart, updateQuantityInCart } from "../../store/actions/actionCreators";
import { FormControl } from "react-bootstrap";
import styled from "styled-components";
import BtnRemoveFromCart from "./BtnRemoveFromCart";

const QuantityInput: React.FC<any> = ({
    quantity,
    product,
    stock,
    removeFromCart,
    updateQuantityInCart
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
        updateQuantityInCart({ itemName: product, qty: Number(inputValue) });
    }, [inputValue, updateQuantityInCart, product]);
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
                <BtnRemoveFromCart itemName={product} />
            </ButtonContainer>
        </>
    );
};

const actionCreators = {
    removeFromCart,
    updateQuantityInCart
};

export default connect(
    null,
    actionCreators
)(QuantityInput);

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
