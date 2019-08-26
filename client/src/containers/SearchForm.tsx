import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import updateSearch, { IActionUpdateSearch } from "../store/actions/updateSearch";

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

interface IProps {
    query: any;
    updateSearch(val: string): IActionUpdateSearch;
}

const SearchForm: React.FC<RouteComponentProps & IProps> = ({ history, query, updateSearch }) => {
    const updateReducer = (value: string) => {
        updateSearch(value);
    };

    type keyboardEvent = React.ChangeEvent<any>;
    const handleSearchChange = (e: keyboardEvent) => {
        updateReducer(e.currentTarget.value);
    };

    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmitSearch = (e: FormElem) => {
        e.preventDefault();
        updateReducer(query);
        history.push(`/search`);
    };

    return (
        <Form inline onSubmit={handleSubmitSearch} action="/search">
            <InputWrapper>
                <FormControl
                    type="text"
                    placeholder="Search inventory"
                    value={query}
                    onChange={handleSearchChange}
                    className="mr-sm-2 search-input"
                    style={{
                        background: "transparent",
                        borderRadius: "15px",
                        border: "none"
                    }}
                />
                <SearchButton>
                    <FontAwesomeIcon icon="search" />
                </SearchButton>
            </InputWrapper>
        </Form>
    );
};

interface IState {
    searchRequest: any;
}

const mapStateToProps = (state: IState) => ({
    query: state.searchRequest.query
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateSearch: (val: string) => dispatch(updateSearch(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SearchForm));
