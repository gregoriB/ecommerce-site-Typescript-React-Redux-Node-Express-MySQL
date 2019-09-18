import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { InputGroup } from "react-bootstrap";

import { changeCategoriesInFilter } from "../../../store/actions/actionCreators";
import usePrevious from "../../../hooks/usePrevious";
import { IFilters } from "../../../types/generalTypes";
import { IFiltersRtn } from "../../../types/actionTypes";

interface IProps {
    categoryName: string;
    selectedCategories: string[];
    changeCategoriesInFilter(arr: string[]): IFiltersRtn;
}

const CategoryItem: React.FC<IProps> = ({
    categoryName,
    selectedCategories,
    changeCategoriesInFilter
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckbox = () => {
        setIsChecked(prevState => !prevState);
    };

    const checkboxPrevState = usePrevious(isChecked);

    useEffect(() => {
        !selectedCategories.length && setIsChecked(false);
    }, [selectedCategories, setIsChecked]);

    useEffect(() => {
        if (checkboxPrevState === isChecked) return;
        let categories = [...selectedCategories];
        if (isChecked) {
            categories.push(categoryName);
        } else {
            categories = categories.filter(category => categoryName !== category);
        }
        changeCategoriesInFilter(categories);
    }, [isChecked, changeCategoriesInFilter, categoryName, selectedCategories, checkboxPrevState]);

    return (
        <StyledInputGroup>
            <Category>
                <StyledInputGroupCheckbox
                    onChange={handleCheckbox}
                    checked={isChecked}
                    id={categoryName}
                    aria-label="Checkbox for following text input"
                />
                <CategoryLabel htmlFor={categoryName} isChecked={isChecked}>
                    {categoryName}
                </CategoryLabel>
            </Category>
        </StyledInputGroup>
    );
};

interface IState {
    filters: IFilters;
}

const mapStateToProps = (state: IState) => ({
    selectedCategories: state.filters.selectedCategories
});

const actionCreators = {
    changeCategoriesInFilter
};

export default connect(
    mapStateToProps,
    actionCreators
)(CategoryItem);

/* ~~~~~~ -- styling -- ~~~~~~ */

const Category = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 0.25rem;
`;

type isChecked = { isChecked: boolean };

const CategoryLabel = styled.label<isChecked>`
    cursor: pointer;
    margin: 0;
    box-sizing: border-box;
    line-height: 1.5;
    height: 100%;
    opacity: ${props => (props.isChecked ? 1 : 0.5)};
`;

const StyledInputGroup = styled(InputGroup)`
    margin-bottom: 0 !important;
    span {
        border: none;
        background: none;
    }
`;

const StyledInputGroupCheckbox = styled(InputGroup.Checkbox)`
    cursor: pointer;
`;
