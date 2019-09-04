import React, { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { IAChangeFilter } from "../../../types/types";

interface IProps {
    name: string;
    selectedCategories: string[];
    changeFilter(filter: IAChangeFilter): IAChangeFilter;
}

const CategoryItem: React.FC<IProps> = ({ name, selectedCategories, changeFilter }) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckbox = () => {
        setIsChecked(prevState => !prevState);
    };

    useEffect(() => {
        !selectedCategories.length && setIsChecked(false);
    }, [selectedCategories, setIsChecked]);

    useEffect(() => {
        let categories = [...selectedCategories];
        if (isChecked) {
            categories.push(name);
        } else {
            categories = categories.filter(category => name !== category);
        }
        changeFilter({ type: "SELECTED_CATEGORIES", payload: categories });
    }, [isChecked]);

    return (
        <StyledInputGroup>
            <Category>
                <StyledInputGroupCheckbox
                    onChange={handleCheckbox}
                    checked={isChecked}
                    id={name}
                    aria-label="Checkbox for following text input"
                />
                <CategoryLabel htmlFor={name} isChecked={isChecked}>
                    {name}
                </CategoryLabel>
            </Category>
        </StyledInputGroup>
    );
};

export default CategoryItem;

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
