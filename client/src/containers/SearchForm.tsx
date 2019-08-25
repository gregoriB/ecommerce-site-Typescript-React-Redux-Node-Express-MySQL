import React, { useState } from "react";
import { withRouter, RouteComponentProps, Router } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

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

const SearchForm: React.FC<RouteComponentProps> = ({ history }) => {
    const [searchValue, setSearchValue] = useState("");

    const updateReducer = (value: string) => {
        const actionArgs: any = { type: "SEARCH REQUEST", payload: value };
        dispatch(actionArgs);
    };

    type keyboardEvent = React.ChangeEvent<any>;
    const handleSearchChange = (e: keyboardEvent) => {
        setSearchValue(e.target.value);
        updateReducer(e.target.value);
    };

    const dispatch = useDispatch();

    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmitSearch = (e: FormElem) => {
        e.preventDefault();
        updateReducer(searchValue);
        history.push(`/search`);
    };

    return (
        <Form inline onSubmit={handleSubmitSearch} action="/search">
            <InputWrapper>
                <FormControl
                    type="text"
                    placeholder="Search inventory"
                    value={searchValue}
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

export default withRouter(SearchForm);
