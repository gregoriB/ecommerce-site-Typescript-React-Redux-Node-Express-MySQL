import React from "react";
import { Alert, Button } from "react-bootstrap";
import styled from "styled-components";
import queryDatabase from "../../../helpers/queryDatabase";

interface IProps {
    hideWarning(): void;
    onHide(): void;
    userData: any;
    updateUserData(val: any): any;
}

const NewAccountWarning: React.FC<IProps> = ({ hideWarning, onHide, userData, updateUserData }) => {
    const sendRegistrationForm = async () => {
        const { username, email, password } = userData;
        const query = { username: username.text, email: email.text, password: password.text };
        const dbQuery = { path: "user", query, method: "POST" };
        const results = await queryDatabase(dbQuery);
        if (results.insertId && results.affectedRows) {
            updateUserData({
                type: "UPDATE_USER_DATA",
                payload: {
                    name: username.text,
                    email: email.text
                }
            });
            onHide();
        }
    };

    const cancelRegistration = () => {
        onHide();
        hideWarning();
    };
    return (
        <Alert variant="warning" style={{ marginBottom: 0, paddingBottom: "2rem" }}>
            <WarningText>
                <p>
                    This is not a real store. I made this site for my web development portfolio. Any
                    accounts created should be done so FOR TESTING PURPOSES ONLY.
                </p>

                <p>Are you sure you want to create an account?</p>
            </WarningText>
            <ButtonContainer>
                <StyledCancelButton variant="outline-warning" onClick={cancelRegistration}>
                    cancel
                </StyledCancelButton>
                <Button variant="warning" onClick={sendRegistrationForm}>
                    Yes, create a new account
                </Button>
            </ButtonContainer>
        </Alert>
    );
};

export default NewAccountWarning;

/* ~~~~~~ -- styling -- ~~~~~~ */

const WarningText = styled.div`
    text-align: justify;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledCancelButton = styled(Button)`
    color: #856404;
    border-color: #856404;
`;
