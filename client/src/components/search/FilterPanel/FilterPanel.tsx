import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    changeCategoriesInFilter,
    changePriceRangeInFilter
} from "../../../store/actions/actionCreators";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { Form, Button } from "react-bootstrap";
import PriceRangeSelector from "./PriceRangeSelector";

const FilterPanel: React.FC<any> = ({
    allCategories,
    changeCategoriesInFilter,
    changePriceRangeInFilter,
    selectedCategories
}) => {
    const [mappedCategories, setMappedCategories] = useState();

    const clearFilters = () => {
        changeCategoriesInFilter([]);
        changePriceRangeInFilter([undefined, undefined]);
    };

    useEffect(() => {
        setMappedCategories(
            allCategories.map((category: any) => {
                return <CategoryItem key={category} categoryName={category} />;
            })
        );
    }, [allCategories, selectedCategories]);
    return (
        <Panel>
            <h4>Filter by:</h4>
            <section>
                <div>Category</div>
                <Form>{mappedCategories}</Form>
            </section>
            <section>
                <div>Price</div>
                <PriceRangeSelector />
            </section>
            <section>
                <StyledButton variant="secondary" size="sm" onClick={clearFilters} block>
                    Clear All Filters
                </StyledButton>
            </section>
        </Panel>
    );
};

interface IState {
    filters: { [key: string]: string[] };
}

const mapStateToProps = (state: IState) => ({
    allCategories: state.filters.allCategories,
    selectedCategories: state.filters.selectedCategories
});

const actionCreators = {
    changeCategoriesInFilter,
    changePriceRangeInFilter
};

export default connect(
    mapStateToProps,
    actionCreators
)(FilterPanel);

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
