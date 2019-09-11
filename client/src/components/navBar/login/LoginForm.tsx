import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormControl, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "../userSettings/User";
import LoginAlert from "./LoginAlert";
import queryDatabase from "../../../helpers/queryDatabase";
import RegistrationModal from "../registration/RegistrationModal";
import { updateUserData } from "../../../store/actions/actionCreators";
import { IQueryDBArgs, IUserData } from "../../../types/generalTypes";
import { stdBreakPoint } from "../../../helpers/breakPoints";

const loginIntialValues = {
    username: "",
    password: ""
};

interface IProps {
    username: string;
    updateUserData(val: IUserData): void;
}

const LoginForm: React.FC<IProps> = ({ username, updateUserData }) => {
    const [loginValues, setLoginValues] = useState(loginIntialValues);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);

    type keyboardEvent = React.ChangeEvent<EventTarget>;

    const handleLoginChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        setLoginValues({
            ...loginValues,
            [target.name]: target.value
        });
    };

    type FormElem = React.FormEvent<HTMLFormElement>;

    const handleSubmitLogin = async (e: FormElem) => {
        e.preventDefault();
        if (!loginValues.username) {
            return;
        }
        const dbQuery: IQueryDBArgs = { path: "login", query: loginValues, method: "POST" };
        const data = await queryDatabase(dbQuery);
        if (data[0] && data[0].username === loginValues.username) {
            updateUserData(data[0]);
        } else {
            setIsError(true);
        }
        setLoginValues(loginIntialValues);
    };

    useEffect(() => {
        setIsLoggedIn(username ? true : false);
    }, [username]);

    return (
        <LoginContainer>
            {isError && <LoginAlert show={isError} setShow={setIsError} />}
            {(isLoggedIn && <User />) || (
                <LoginContainer>
                    <StyledForm inline onSubmit={handleSubmitLogin}>
                        <StyleFormControl
                            type="text"
                            name="username"
                            value={loginValues.username}
                            placeholder="username"
                            className="mr-sm-2 form-control-sm"
                            onChange={handleLoginChange}
                        />
                        <StyleFormControl
                            type="password"
                            name="password"
                            value={loginValues.password}
                            placeholder="password"
                            className="mr-sm-2 form-control-sm"
                            onChange={handleLoginChange}
                        />
                        <StyledButton type="submit" className="btn-sm" variant="outline-primary">
                            <StyledSignInIcon icon="sign-in-alt" size="lg" />
                        </StyledButton>
                    </StyledForm>
                    <span>
                        <RegistrationLink onClick={() => setIsRegModalOpen(true)}>
                            register new account
                        </RegistrationLink>
                        <RegistrationModal
                            show={isRegModalOpen}
                            onHide={() => setIsRegModalOpen(false)}
                        />
                    </span>
                </LoginContainer>
            )}
        </LoginContainer>
    );
};

interface IState {
    userData: IUserData;
}

const mapStateToProps = (state: IState) => ({
    username: state.userData.username
});

const actionCreators = {
    updateUserData
};

export default connect(
    mapStateToProps,
    actionCreators
)(LoginForm);

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledForm = styled(Form)`
    &.form-inline {
        @media (max-width: ${stdBreakPoint}px) {
            flex-wrap: wrap;
            margin: 1rem 0;
        }
        @media (min-width: ${stdBreakPoint + 1}px) {
            flex-flow: unset;
        }
    }
`;

const LoginContainer = styled.div`
    display: flex;
    span {
        display: flex;
        align-items: center;
        margin: 0 1rem;
    }
    @media (max-width: ${stdBreakPoint}px) {
        flex-direction: column;
        justify-content: flex-start;
    }
`;

const RegistrationLink = styled.button`
    background: none;
    border: none;
    text-decoration: underline;
    color: #007bff;
    @media (max-width: ${stdBreakPoint}px) {
        margin: 1rem 0;
    }
`;

const StyledSignInIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;

const StyleFormControl = styled(FormControl)`
    &.form-control {
        max-width: 150px;
        @media (max-width: ${stdBreakPoint}px) {
            margin: 0 !important;
            width: 100% !important;
            max-width: unset;
        }
    }
`;

const StyledButton = styled(Button)`
    @media (max-width: ${stdBreakPoint}px) {
        &.btn {
            text-align: left;
            width: 100%;
            ::after {
                content: "login";
            }
        }
    }
`;
