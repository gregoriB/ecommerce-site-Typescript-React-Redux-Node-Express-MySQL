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
import { IFilters } from "../../../types/generalTypes";
import { IFiltersRtn } from "../../../types/actionTypes";
import { stdBreakPoint } from "../../../helpers/breakPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    allCategories?: string[];
    selectedCategories: string[];
    windowWidth: number;
    changeCategoriesInFilter(arr: string[]): IFiltersRtn;
    changePriceRangeInFilter(arr: number[] | undefined[]): IFiltersRtn;
}

const FilterPanel: React.FC<IProps> = ({
    allCategories,
    changeCategoriesInFilter,
    changePriceRangeInFilter,
    selectedCategories,
    windowWidth
}) => {
    const [isPanelActive, setIsPanelActive] = useState(window.innerWidth > stdBreakPoint);
    const [mappedCategories, setMappedCategories] = useState();

    const togglePanel = () => {
        setIsPanelActive(prevState => !prevState);
    };

    const clearFilters = () => {
        changeCategoriesInFilter([]);
        changePriceRangeInFilter([undefined, undefined]);
    };

    useEffect(() => {
        setMappedCategories(
            allCategories!.map((category: string) => {
                return <CategoryItem key={category} categoryName={category} />;
            })
        );
    }, [allCategories, selectedCategories]);

    useEffect(() => {
        setIsPanelActive(window.innerWidth > stdBreakPoint);
    }, [windowWidth]);

    return (
        <PanelContainer isActive={isPanelActive}>
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
            <StyledEllipsisVIcon onClick={togglePanel} isActive={isPanelActive}>
                <FontAwesomeIcon icon="ellipsis-v" />
            </StyledEllipsisVIcon>
        </PanelContainer>
    );
};

interface IState {
    filters: IFilters;
    windowSize: {
        windowWidth: number;
    };
}

const mapStateToProps = (state: IState) => ({
    allCategories: state.filters.allCategories,
    selectedCategories: state.filters.selectedCategories,
    windowWidth: state.windowSize.windowWidth
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

type isActive = { isActive: boolean };

const PanelContainer = styled.div<isActive>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    @media (max-width: ${stdBreakPoint}px) {
        position: fixed;
        top: 60px;
        left: 0;
        transform: translateX(${props => (props.isActive ? "0" : "-89%")});
        transition: transform 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
        z-index: 12;
    }
`;

const Panel = styled.div`
    padding: 0.7rem;
    width: 100%;
    margin: 1rem;
    margin-right: 0;
    background: #fffe;
    border: 1px solid #dfdfdf;
    @media (max-width: ${stdBreakPoint}px) {
        border-radius: 10px;
    }
`;

const StyledButton = styled(Button)`
    margin-top: 1rem;
`;

const StyledEllipsisVIcon = styled.div<isActive>`
    font-size: 4rem;
    width: 10%;
    color: #42484d;
    opacity: ${props => (props.isActive ? ".7" : ".4")};
    transition: 0.2s;
    @media (min-width: ${stdBreakPoint + 1}px) {
        visibility: hidden;
        opacity: 0;
    }
`;
