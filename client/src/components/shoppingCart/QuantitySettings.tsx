import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { removeFromCart, updateQuantityInCart } from "../../store/actions/actionCreators";
import { FormControl } from "react-bootstrap";
import styled from "styled-components";
import BtnRemoveFromCart from "./BtnRemoveFromCart";

interface INewQty {
    itemName: string;
    qty: number;
}

interface IProps {
    itemName: string;
    quantity: number | undefined;
    stock: number | undefined;
    removeFromCart(val: { itemName: string }): void;
    updateQuantityInCart(val: INewQty): void;
}

const QuantityInput: React.FC<IProps> = ({
    quantity,
    itemName,
    stock,
    removeFromCart,
    updateQuantityInCart
}) => {
    const [inputValue, setInputValue] = useState(quantity);
    type keyboardEvent = React.ChangeEvent<EventTarget>;
    const handleChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        const value = Number(target.value);
        if (stock && value > stock) return;
        setInputValue(value);
    };

    const handleBlur = () => {
        if (inputValue && inputValue > 0) return;

        removeFromCart({ itemName });
    };
    useEffect(() => {
        updateQuantityInCart({ itemName, qty: Number(inputValue) });
    }, [inputValue, updateQuantityInCart, itemName]);
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
                <BtnRemoveFromCart itemName={itemName} />
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
