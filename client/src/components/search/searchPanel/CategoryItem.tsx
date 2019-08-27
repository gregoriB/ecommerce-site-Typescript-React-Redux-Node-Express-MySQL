import React, { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { IAChangeFilter } from "../../../types/types";

const Category = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 0.25rem;
`;

const CategoryLabel = styled.label`
    cursor: pointer;
    margin: 0;
    box-sizing: border-box;
    line-height: 1.5;
    height: 100%;
`;

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
        selectedCategories.includes(name) && setIsChecked(true);
    }, []);

    useEffect(() => {
        let categories = [...selectedCategories];
        if (isChecked) {
            categories.push(name);
        } else {
            categories = categories.filter(category => name !== category);
        }
        changeFilter({ type: "SELECTED CATEGORIES", payload: categories });
    }, [isChecked]);

    return (
        <InputGroup className="mb-3">
            <Category>
                <InputGroup.Checkbox
                    onChange={handleCheckbox}
                    checked={isChecked}
                    id={name}
                    aria-label="Checkbox for following text input"
                    style={{ border: "none" }}
                />
                <CategoryLabel htmlFor={name} style={{ opacity: isChecked ? 1 : 0.5 }}>
                    {name}
                </CategoryLabel>
            </Category>
        </InputGroup>
    );
};

export default CategoryItem;
