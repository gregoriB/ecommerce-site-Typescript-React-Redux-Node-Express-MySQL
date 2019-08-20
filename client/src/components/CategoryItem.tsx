import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup } from "react-bootstrap";
import styled from 'styled-components';

const Category = styled.div`
    display: flex;
    align-items: center;
    /* background: #e9ecef; */
    width: 100%;
    /* border: 1px solid #ced4da; */
    border-radius: .25rem;
`;

const CategoryLabel = styled.label`
    cursor: pointer;
    margin: 0;
    /* padding: 0 1rem; */
    box-sizing: border-box;
    line-height: 1.5;
    height: 100%;
`;

interface IProps {
    name: string;
}

const CategoryItem: React.FC<IProps> = ({ name }) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckbox = () => {
        setIsChecked(prevState => !prevState)
    }
    return (
        <InputGroup className="mb-3"> 
            <Category>
            <InputGroup.Checkbox 
                onChange={handleCheckbox} 
                checked={isChecked} 
                id={name} 
                aria-label="Checkbox for following text input" 
                style={{ border: 'none' }}
            />
            <CategoryLabel htmlFor={name}>{name}</CategoryLabel>
            </Category>
        </InputGroup>
    )
}

export default CategoryItem;