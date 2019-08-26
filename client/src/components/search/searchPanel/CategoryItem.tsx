import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { IActionChangeCategories } from "../../../store/actions/changeCategories";

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
    changeCategories(categories: any): IActionChangeCategories;
}

const CategoryItem: React.FC<IProps> = ({ name, selectedCategories, changeCategories }) => {
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
        changeCategories({ type: "SELECTED CATEGORIES", payload: categories });
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

interface IState {
    categories: { [key: string]: string[] };
}

const mapStateToProps = (state: IState) => ({
    selectedCategories: state.categories.selectedCategories
});

export default connect(mapStateToProps)(CategoryItem);
