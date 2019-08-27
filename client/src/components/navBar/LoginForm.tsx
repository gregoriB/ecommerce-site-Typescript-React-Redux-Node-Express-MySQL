import React, { useState } from "react";
import { FormControl, Form, Button, Nav } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserName from "./UserName";

const LoginContainer = styled.div`
    display: flex;
    margin-left: auto;
`;

// userdata needs to go into redux
const LoginForm = () => {
    const [loginValues, setLoginValues] = useState({ name: "", password: "" });
    const [userData, setUserData] = useState();

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
        const options = {
            method: "POST",
            body: JSON.stringify({ name: loginValues.name, password: loginValues.password }),
            headers: { "Content-Type": "applications/json" }
        };
        const response = await fetch(`http://localhost:34567/login`, options);
        const results: any = await response.json();
        console.log(results);
        if (results[0].email === loginValues.name) {
            setUserData(<UserName results={results[0]} />);
        }
    };

    return (
        <LoginContainer>
            {userData || (
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
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0 1rem"
                        }}
                    >
                        <Nav.Link href="#home-page">register new account</Nav.Link>
                    </span>
                </LoginContainer>
            )}
        </LoginContainer>
    );
};

export default LoginForm;
