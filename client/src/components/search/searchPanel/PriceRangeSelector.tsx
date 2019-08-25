import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriceRangeContainer = styled.div`
    display: flex;
    align-items: center;
`;

const RangeLabel = styled.label`
    margin: 0;
    font-size: 0.8rem;
`;

const RangeButton = styled.button`
    border: none;
    border-radius: 3px;
    background: #f8f9fa;
    margin: 0;
    padding: 0 1rem;
    font-weight: bold;
    transition: 0.1s;
    :hover {
        background: #dedede;
    }
`;

const NumberInput = styled.input.attrs({ type: "number" })`
    border: none;
    background: #f8f9fa;
    width: 4rem;
    height: 1.5rem;
    font-size: 0.8rem;
    margin-right: 0.5rem;
    padding: 0 0.5rem;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const PriceRangeSelector = () => {
    return (
        <PriceRangeContainer>
            <RangeLabel>$</RangeLabel>
            <NumberInput placeholder="from" />
            <RangeLabel> - $</RangeLabel>
            <NumberInput placeholder="to" />
            <RangeButton>
                <FontAwesomeIcon icon="angle-right"></FontAwesomeIcon>
            </RangeButton>
        </PriceRangeContainer>
    );
};

export default PriceRangeSelector;
