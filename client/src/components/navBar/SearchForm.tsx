import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {
    updateSearch,
    changeCategoriesInFilter,
    changePriceRangeInFilter
} from "../../store/actions/actionCreators";
import { IFiltersRtn } from "../../types/actionTypes";

interface IProps {
    query: string;
    updateSearch(val: string): void;
    changeCategoriesInFilter(arr: string[]): IFiltersRtn;
    changePriceRangeInFilter(arr: number[]): IFiltersRtn;
}

const SearchForm: React.FC<IProps & RouteComponentProps> = ({
    history,
    query,
    updateSearch,
    changeCategoriesInFilter,
    changePriceRangeInFilter
}) => {
    const updateReducers = (value: string) => {
        updateSearch(value);
        changeCategoriesInFilter([]);
        changePriceRangeInFilter([]);
    };

    type keyboardEvent = React.ChangeEvent<EventTarget>;
    const handleSearchChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        updateReducers(target.value);
    };

    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmitSearch = (e: FormElem) => {
        e.preventDefault();
        updateReducers(query);
        history.push(`/search`);
    };

    return (
        <Form inline onSubmit={handleSubmitSearch}>
            <InputWrapper>
                <StyledFormControl
                    type="text"
                    placeholder="Search inventory"
                    value={query}
                    onChange={handleSearchChange}
                />
                <SearchButton>
                    <FontAwesomeIcon icon="search" />
                </SearchButton>
            </InputWrapper>
        </Form>
    );
};

interface IState {
    searchRequest: {
        [key: string]: string;
    };
}

const mapStateToProps = (state: IState) => ({
    query: state.searchRequest.query
});

const actionCreators = {
    updateSearch,
    changeCategoriesInFilter,
    changePriceRangeInFilter
};

export default connect(
    mapStateToProps,
    actionCreators
)(withRouter(SearchForm));

/* ~~~~~~ -- styling -- ~~~~~~ */

const InputWrapper = styled.div`
    position: relative;
    background: white;
    border: thin solid #dfdfdf;
    border-radius: 15px;
    display: flex;
    align-items: center;
`;

const SearchButton = styled.button`
    background: white;
    border: none;
    position: absolute;
    margin-right: 0.3rem;
    right: 0;
`;

const StyledFormControl = styled(FormControl)`
    &.form-control {
        background: transparent;
        border-radius: 15px;
        border: none;
        margin-right: 0 !important;
    }
`;
