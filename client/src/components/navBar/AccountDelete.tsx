import React from "react";
import styled from "styled-components";
import { Alert, FormControl, Button } from "react-bootstrap";

const DeleteContainer = styled.div`
    width: 95%;
    margin: 0 auto;
    text-align: center;
    span {
        display: inline-block;
        margin: 0.5rem 0;
    }
`;

const InputContainer = styled.div`
    width: 100%;
    color: red;
    display: flex;
    justify-content: stretch;
    align-items: center;
    margin: 0;
`;

const AccountDelete = () => {
    return (
        <>
            <Alert variant="danger">
                <DeleteContainer>
                    <span>Are you sure? There is no reversing this account deletion.</span>
                    <InputContainer>
                        <FormControl
                            placeholder="Enter the account email address to delete it"
                            aria-label="delete email address"
                            aria-describedby="basic-addon1"
                            style={{ width: "100%", color: "red", marginRight: ".5rem" }}
                        />
                        <Button variant="danger">delete</Button>
                    </InputContainer>
                </DeleteContainer>
            </Alert>
        </>
    );
};

export default AccountDelete;
