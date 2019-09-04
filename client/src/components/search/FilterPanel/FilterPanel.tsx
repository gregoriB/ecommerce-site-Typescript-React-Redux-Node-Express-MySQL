import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { Form, Button } from "react-bootstrap";
import PriceRangeSelector from "./PriceRangeSelector";
import { IAChangeFilter } from "../../../types/types";

interface IProps {
    allCategories: string[];
    selectedCategories: string[];
    priceRange: any;
    changeFilter(filter: any): IAChangeFilter;
}

const FilterPanel: React.FC<IProps> = ({
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
            allCategories.map(category => {
                return (
                    <CategoryItem
                        selectedCategories={selectedCategories}
                        key={category}
                        name={category}
                        changeFilter={changeFilter}
                    />
                );
            })
        );
    }, [allCategories, selectedCategories, changeFilter]);
    return (
        <Panel>
            <h4>Filter by:</h4>
            <section>
                <div>Category</div>
                <Form>{mappedCategories}</Form>
            </section>
            <section>
                <div>Price</div>
                <PriceRangeSelector priceRange={priceRange} changeFilter={changeFilter} />
            </section>
            <section>
                <StyledButton variant="secondary" size="sm" onClick={clearFilters} block>
                    Clear All Filters
                </StyledButton>
            </section>
        </Panel>
    );
};

export default FilterPanel;

/* ~~~~~~ -- styling -- ~~~~~~ */

const Panel = styled.div`
    padding: 1rem;
    width: 20vw;
    margin: 1rem;
    margin-right: 0;
    background: white;
    border: 1px solid #dfdfdf;
`;

const StyledButton = styled(Button)`
    margin-top: 1rem;
`;
