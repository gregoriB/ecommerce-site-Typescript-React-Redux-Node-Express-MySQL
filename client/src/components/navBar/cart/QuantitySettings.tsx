import React, { useState, useEffect, useRef } from "react";
import { FormControl, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonChangeCart from "../../../containers/ButtonChangeCart";

interface IProps {
    quantity: number;
    product: string;
    updateQuantity(val: any): any;
}

const QuantityInput: React.FC<IProps> = ({ quantity, product, updateQuantity }) => {
    const [inputValue, setInputValue] = useState(JSON.stringify(quantity));
    const [isEditDisabled, setIsEditDisabled] = useState(true);
    type keyboardEvent = React.ChangeEvent<EventTarget>;
    const handleChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        setInputValue(target.value);
    };

    const updateReducer = () => {
        updateQuantity({ item: product, quantity: Number(inputValue) });
    };

    type FormElem = React.FormEvent<HTMLFormElement>;
    const handleSubmit = (e: FormElem) => {
        e.preventDefault();
        updateReducer();
        setIsEditDisabled(true);
    };

    const handleEditBtnClick = () => {
        if (!isEditDisabled) {
            updateReducer();
        }
        setIsEditDisabled(prevState => !prevState);
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        !isEditDisabled && inputRef.current && inputRef.current.focus();
    }, [isEditDisabled]);
    return (
        <>
            <FormContainer onSubmit={handleSubmit}>
                <StyleFormControl
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    min={0}
                    placeholder={isEditDisabled ? quantity : ""}
                    disabled={isEditDisabled}
                    ref={inputRef}
                />
                <StyledEditButton
                    variant={isEditDisabled ? "outline-secondary" : "info"}
                    style={{ border: "none" }}
                    onClick={handleEditBtnClick}
                    title="click to change quantity"
                >
                    <FontAwesomeIcon icon={isEditDisabled ? "pen" : "check"} />
                </StyledEditButton>
            </FormContainer>
            <ButtonContainer>
                <ButtonChangeCart
                    subtract={true}
                    itemName={product}
                    text={""}
                    isDisabled={!isEditDisabled}
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
        width: 35% !important;
        :disabled {
            background-color: white;
            border-color: transparent;
            /* width: 100%; */
            ::-webkit-inner-spin-button,
            ::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
`;

const StyledEditButton = styled(Button)`
    &.btn {
        height: 30px;
        width: 30px;
        margin: 0 0.5rem;
        padding: 0;
    }
`;

const FormContainer = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* width: 35%; */
    margin: 0 1rem;
`;

const ButtonContainer = styled.div`
    width: 30px;
    /* height: 30px; */
`;
