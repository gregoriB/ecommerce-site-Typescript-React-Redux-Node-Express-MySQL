import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { Form, Button } from "react-bootstrap";
import PriceRangeSelector from "./PriceRangeSelector";
import { IAChangeFilter } from "../../../types/types";

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
    changeFilter(filter: any): IAChangeFilter;
}

const SearchPanel: React.FC<IProps> = ({
    allCategories,
    changeFilter,
    selectedCategories,
    priceRange
}) => {
    const [mappedCategories, setMappedCategories] = useState();

    const clearFilters = () => {
        changeFilter({ type: "SELECTED_CATEGORIES", payload: [] });
        changeFilter({ type: "PRICE_RANGE", payload: [undefined, undefined] });
    };

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
            <Section>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={clearFilters}
                    block
                    style={{ marginTop: "1rem" }}
                >
                    Clear All Filters
                </Button>
            </Section>
        </Panel>
    );
};

export default SearchPanel;
