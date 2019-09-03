import React, { useState, useEffect, useRef } from "react";
import { FormControl, Form, Button, Nav } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "./User";
import LoginAlert from "./LoginAlert";
import queryDatabase from "../../helpers/queryDatabase";
import RegistrationModal from "../modals/RegistrationModal";

const LoginContainer = styled.div`
    display: flex;
    margin-left: auto;
    span {
        display: flex;
        align-items: center;
        margin: 0 1rem;
    }
`;

const loginIntialValues = {
    username: "gregorib",
    password: "Brandon12!!"
};

const RegistrationLink = styled.button`
    background: none;
    border: none;
    text-decoration: underline;
    color: #007bff;
`;

interface IProps {
    userData: any;
    updateUserData(val: any): any;
}

const LoginForm: React.FC<IProps> = ({ userData, updateUserData }) => {
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
        const dbQuery = { path: "user/login", query: loginValues, method: "POST" };
        const data = await queryDatabase(dbQuery);
        if (data[0] && data[0].name === loginValues.username) {
            updateUserData({ type: "UPDATE_USER_DATA", payload: data[0] });
        } else {
            setIsError(true);
        }
        setLoginValues(loginIntialValues);
    };

    useEffect(() => {
        setIsLoggedIn(userData.name ? true : false);
    }, [userData]);

    const formRef = useRef<any>(null);

    useEffect(() => {
        formRef.current.click();
    }, []);

    return (
        <LoginContainer>
            {isError && <LoginAlert show={isError} setShow={setIsError} />}
            {(isLoggedIn && <User userData={userData} updateUserData={updateUserData} />) || (
                <LoginContainer>
                    <Form inline onSubmit={handleSubmitLogin}>
                        <FormControl
                            type="text"
                            name="username"
                            value={loginValues.username}
                            placeholder="username"
                            className="mr-sm-2 form-control-sm"
                            onChange={handleLoginChange}
                        />
                        <FormControl
                            type="password"
                            name="password"
                            value={loginValues.password}
                            placeholder="password"
                            className="mr-sm-2 form-control-sm"
                            onChange={handleLoginChange}
                        />
                        <Button type="submit" className="btn-sm" ref={formRef}>
                            Sign In
                            <FontAwesomeIcon
                                icon="sign-in-alt"
                                size="lg"
                                style={{ margin: "0 .5rem" }}
                            />
                        </Button>
                    </Form>
                    <span>
                        <RegistrationLink onClick={() => setIsRegModalOpen(true)}>
                            register new account
                        </RegistrationLink>
                        <RegistrationModal
                            show={isRegModalOpen}
                            onHide={() => setIsRegModalOpen(false)}
                            updateUserData={updateUserData}
                        />
                    </span>
                </LoginContainer>
            )}
        </LoginContainer>
    );
};

export default LoginForm;
