import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FormControl } from "react-bootstrap";

import { removeFromCart, updateQuantityInCart } from "../../store/actions/actionCreators";

import BtnRemoveFromCart from "./BtnRemoveFromCart";

interface INewQty {
    itemName: string;
    qty: number;
}

interface IProps {
    itemName: string;
    quantity: number;
    stock: number;
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
    const [inputValue, setInputValue] = useState(quantity!);
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
        <QuantityContainer>
            <InputContainer>
                <span>qty: </span>
                <StyleFormControl
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={0}
                    max={stock}
                />
            </InputContainer>
            <BtnRemoveFromCart itemName={itemName} />
        </QuantityContainer>
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

/* ~~~~~~ -- styling -- ~~~~~~ */

const QuantityContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StyleFormControl = styled(FormControl)`
    &.form-control {
        padding: 0.25rem;
        width: 50px;
        margin: 0 20px 0 20px;
    }
`;
