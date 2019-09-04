import React, { useState } from "react";
import styled from "styled-components";
import { Alert, FormControl, Button } from "react-bootstrap";
import queryDatabase from "../../../helpers/queryDatabase";

interface IProps {
    userData: any;
    updateUserData(val: any): any;
}

const AccountDelete: React.FC<IProps> = ({ userData, updateUserData }) => {
    const [input, setInput] = useState("");
    const [isMatchingError, setIsMatchingError] = useState(false);
    type keyboardEvent = React.ChangeEvent<any>;
    const handleInputChange = (e: keyboardEvent) => {
        setInput(e.currentTarget.value);
    };

    const sendDeleteRequest = async () => {
        const dbQuery = { path: `user/${userData.email}`, method: "DELETE" };
        const results = await queryDatabase(dbQuery);
        if (results.affectedRows) {
            updateUserData({ type: "DELETE_USER_DATA", payload: null });
        }
    };

    const deleteAccount = (e: any) => {
        e.preventDefault();
        if (input !== userData.email) {
            return setIsMatchingError(true);
        }
        sendDeleteRequest();
    };

    return (
        <StyledAlert variant="danger">
            <DeleteContainer>
                <span>Are you sure? There is no reversing this account deletion.</span>
                <Form onSubmit={deleteAccount}>
                    <StyledFormControl
                        placeholder="Enter the account email address to delete it"
                        aria-label="delete email address"
                        aria-describedby="basic-addon1"
                        onChange={handleInputChange}
                        value={input}
                        style={{ borderBottomColor: isMatchingError ? "red" : undefined }}
                    />
                    <Button variant="danger" type="submit">
                        delete
                    </Button>
                </Form>
            </DeleteContainer>
        </StyledAlert>
    );
};

export default AccountDelete;

/* ~~~~~~ -- styling -- ~~~~~~ */

const DeleteContainer = styled.div`
    width: 95%;
    margin: 0 auto;
    text-align: center;
    span {
        display: inline-block;
        margin: 0.5rem 0;
    }
`;

const Form = styled.form`
    width: 100%;
    color: red;
    display: flex;
    justify-content: stretch;
    align-items: center;
    margin: 0;
`;

const StyledFormControl = styled(FormControl)`
    width: 100%;
    color: red;
    margin-right: 0.5rem;
    border: 2px solid transparent;
`;

const StyledAlert = styled(Alert)`
    margin: 0;
`;
