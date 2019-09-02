import React, { useState } from "react";
import styled from "styled-components";
import { Alert, FormControl, Button } from "react-bootstrap";
import queryDatabase from "../../helpers/queryDatabase";

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
        const dbQuery = { path: `delete/${userData.email}`, method: "DELETE" };
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
        <>
            <Alert variant="danger">
                <DeleteContainer>
                    <span>Are you sure? There is no reversing this account deletion.</span>
                    <Form onSubmit={deleteAccount}>
                        <FormControl
                            placeholder="Enter the account email address to delete it"
                            aria-label="delete email address"
                            aria-describedby="basic-addon1"
                            style={{
                                width: "100%",
                                color: "red",
                                marginRight: ".5rem",
                                border: "2px solid transparent",
                                borderBottomColor: isMatchingError ? "red" : undefined
                            }}
                            onChange={handleInputChange}
                            value={input}
                        />
                        <Button variant="danger" type="submit">
                            delete
                        </Button>
                    </Form>
                </DeleteContainer>
            </Alert>
        </>
    );
};

export default AccountDelete;
