import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { Form } from "react-bootstrap";
import PriceRangeSelector from "./PriceRangeSelector";
import { IActionchangeFilter } from "../../../store/actions/changeFilter";

const Panel = styled.div`
    padding: 1rem;
    width: 20vw;
    margin: 1rem;
    margin-right: 0;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.125);
`;

const PanelHeader = styled.h4``;

const Section = styled.section``;

const SectionName = styled.div``;

interface IProps {
    allCategories: string[];
    selectedCategories: string[];
    priceRange: any;
    changeFilter(filter: any): IActionchangeFilter;
}

const SearchPanel: React.FC<IProps> = ({
    allCategories,
    changeFilter,
    selectedCategories,
    priceRange
}) => {
    const [mappedCategories, setMappedCategories] = useState();

    useEffect(() => {
        setMappedCategories(
            allCategories.map(category => (
                <CategoryItem
                    selectedCategories={selectedCategories}
                    key={category}
                    name={category}
                    changeFilter={changeFilter}
                />
            ))
        );
    }, [allCategories, selectedCategories]);
    return (
        <Panel>
            <PanelHeader>Filter by:</PanelHeader>
            <Section>
                <SectionName>Category</SectionName>
                <Form>{mappedCategories}</Form>
            </Section>
            <Section>
                <SectionName>Price</SectionName>
                <PriceRangeSelector priceRange={priceRange} changeFilter={changeFilter} />
            </Section>
        </Panel>
    );
};

export default SearchPanel;
