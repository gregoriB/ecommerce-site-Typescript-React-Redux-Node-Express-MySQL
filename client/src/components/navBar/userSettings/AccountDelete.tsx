import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteUserData } from "../../../store/actions/actionCreators";
import styled from "styled-components";
import { Alert, FormControl, Button } from "react-bootstrap";
import queryDatabase from "../../../helpers/queryDatabase";
import { IUserData } from "../../../types/generalTypes";

interface IProps {
    userEmail: string;
    deleteUserData(): void;
}

const AccountDelete: React.FC<IProps> = ({ userEmail, deleteUserData }) => {
    const [input, setInput] = useState("");
    const [isMatchingError, setIsMatchingError] = useState(false);
    type keyboardEvent = React.ChangeEvent<EventTarget>;
    const handleInputChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        setInput(target.value);
    };

    const sendDeleteRequest = async () => {
        const dbQuery = { path: `user/${userEmail}`, method: "DELETE" };
        const data = await queryDatabase(dbQuery);
        if (data.rowCount) {
            deleteUserData();
        }
    };

    type FormElem = React.FormEvent<HTMLFormElement>;

    const deleteAccount = (e: FormElem) => {
        e.preventDefault();
        if (input !== userEmail) {
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

interface IState {
    userData: IUserData;
}

const mapStateToProps = (state: IState) => ({
    username: state.userData.username,
    userEmail: state.userData.email
});

const actionCreators = {
    deleteUserData
};

export default connect(
    mapStateToProps,
    actionCreators
)(AccountDelete);

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
