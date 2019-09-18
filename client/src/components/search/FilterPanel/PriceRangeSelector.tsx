import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { changePriceRangeInFilter } from "../../../store/actions/actionCreators";
import { IFilters } from "../../../types/generalTypes";

interface IProps {
    changePriceRangeInFilter(arr: number[] | undefined[]): void;
    priceRange: number[] | undefined[];
}

const PriceRangeSelector: React.FC<IProps> = ({ changePriceRangeInFilter, priceRange }) => {
    const [inputValue, setInputValue] = useState([0, 0]);

    type keyboardEvent = React.ChangeEvent<EventTarget>;
    const handleChange = (e: keyboardEvent) => {
        const inputValueClone = [...inputValue];
        const target = e.currentTarget as HTMLInputElement;
        const { dataset, value } = target;
        inputValueClone.splice(Number(dataset.input), 1, Number(value));
        setInputValue(inputValueClone);
    };

    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmit = (e: FormElem) => {
        e.preventDefault();
        changePriceRangeInFilter([...inputValue]);
    };

    useEffect(() => {
        const min = priceRange[0],
            max = priceRange[1];
        if (!min && !max) {
            setInputValue([0, 0]);
        }
    }, [priceRange, setInputValue]);

    return (
        <PriceRangeContainer onSubmit={handleSubmit}>
            <RangeLabel>$</RangeLabel>
            <NumberInput
                placeholder="from"
                value={inputValue[0] || ""}
                onChange={handleChange}
                data-input={0}
            />
            <RangeLabel> - $</RangeLabel>
            <NumberInput
                placeholder="to"
                value={inputValue[1] || ""}
                onChange={handleChange}
                data-input={1}
            />
            <RangeButton>
                <FontAwesomeIcon icon="angle-right"></FontAwesomeIcon>
            </RangeButton>
        </PriceRangeContainer>
    );
};

interface IState {
    filters: IFilters;
}

const mapStateToProps = (state: IState) => ({
    priceRange: state.filters.priceRange
});

const actionCreators = {
    changePriceRangeInFilter
};

export default connect(
    mapStateToProps,
    actionCreators
)(PriceRangeSelector);

/* ~~~~~~ -- styling -- ~~~~~~ */

const PriceRangeContainer = styled.form`
    display: flex;
    align-items: center;
`;

const RangeLabel = styled.label`
    width: 1rem;
    margin: 0;
    font-size: 0.8rem;
`;

const RangeButton = styled.button`
    border: none;
    border-radius: 3px;
    background: #f8f9fa;
    margin: 0;
    padding: 0.15rem 0.5rem;
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
