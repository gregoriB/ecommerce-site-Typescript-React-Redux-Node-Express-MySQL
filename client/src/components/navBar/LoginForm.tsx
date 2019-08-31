import React, { useState, useEffect } from "react";
import { FormControl, Form, Button, Nav } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "./User";
import LoginAlert from "./LoginAlert";
import queryDatabase from "../../helpers/queryDatabase";

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
    name: "",
    password: ""
};

interface IProps {
    userData: any;
    updateUserData(val: any): any;
}

const LoginForm: React.FC<IProps> = ({ userData, updateUserData }) => {
    const [loginValues, setLoginValues] = useState(loginIntialValues);
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
        if (!loginValues.name) {
            return;
        }
        const path = `login/${loginValues.name}`;
        const data = await queryDatabase({ path });
        if (data[0] && data[0].name === loginValues.name) {
            updateUserData({ type: "UPDATE_USER_DATA", payload: data[0] });
        } else {
            setIsError(true);
        }
        setLoginValues(loginIntialValues);
    };

    useEffect(() => {
        const { name, email } = userData;
        setIsLoggedIn(name || email ? true : false);
    }, [userData]);

    return (
        <LoginContainer>
            {isError && <LoginAlert show={isError} setShow={setIsError} />}
            {(isLoggedIn && <User userData={userData} updateUserData={updateUserData} />) || (
                <LoginContainer>
                    <Form inline onSubmit={handleSubmitLogin}>
                        <FormControl
                            type="text"
                            name="name"
                            value={loginValues.name}
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
                        <Button type="submit" className="btn-sm">
                            Sign In
                            <FontAwesomeIcon
                                icon="sign-in-alt"
                                size="lg"
                                style={{ margin: "0 .5rem" }}
                            />
                        </Button>
                    </Form>
                    <span>
                        <Nav.Link href="#home-page">register new account</Nav.Link>
                    </span>
                </LoginContainer>
            )}
        </LoginContainer>
    );
};

export default LoginForm;
