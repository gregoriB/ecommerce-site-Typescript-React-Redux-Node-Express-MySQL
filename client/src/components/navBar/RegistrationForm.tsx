import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import * as validate from "../../helpers/formValidation";
import queryDatabase from "../../helpers/queryDatabase";

const FormContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    background: white;
    padding: 2rem;
    div {
        margin: 0;
    }
    button {
        margin: 3rem 0;
    }
    input {
        margin-top: 2rem;
        border: 1px solid #dfdfdf;
        background: #f8f9fa;
    }
`;

type visibility = { visibility?: string };

const ToolTip = styled.div<visibility>`
    position: absolute;
    text-align: justify;
    padding: 0.2rem;
    width: 100%;
    color: #41688a;
    background: #fff3cd;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    letter-spacing: 1px;
    visibility: ${props => props.visibility};
    z-index: 1000;
    border: 1px solid #f8d7da;
`;

interface IProps {
    updateUserData(val: any): any;
}

const initialFieldsState = {
    username: { text: "", isValid: null, borderColor: "#dfdfdf" },
    email: { text: "", isValid: null, borderColor: "#dfdfdf" },
    password: { text: "", isValid: null, borderColor: "#dfdfdf" }
};

const RegistrationPage: React.FC<IProps> = ({ updateUserData }) => {
    const [fields, setFields] = useState(initialFieldsState);
    const { username, email, password } = fields;
    type FormElem = React.ChangeEvent<HTMLFormElement>;
    const handleSubmit = (e: FormElem) => {
        e.preventDefault();
        if (username.isValid && email.isValid && password.isValid) {
            sendRegistrationForm();
        }
    };

    const sendRegistrationForm = async () => {
        const query = { username: username.text, email: email.text, password: password.text };
        const dbQuery = { path: "register", query, method: "POST" };
        const results = await queryDatabase(dbQuery);
        console.log(results);
        if (results.insertId && results.affectedRows) {
            const userData = {
                type: "UPDATE_USER_DATA",
                payload: {
                    name: username.text,
                    email: email.text
                }
            };
            updateUserData(userData);
            setFields(initialFieldsState);
        }
    };

    type keyboardEvent = React.ChangeEvent<any>;
    const handleChange = (e: keyboardEvent) => {
        const { validateUsername, validateEmail, validatePassword } = validate;
        const { dataset, value } = e.currentTarget;
        let isValid = null;
        if (value) {
            switch (dataset.name) {
                case "username":
                    isValid = validateUsername(value);
                    break;
                case "email":
                    isValid = validateEmail(value);
                    break;
                case "password":
                    isValid = validatePassword(value);
                    break;
                default:
                    break;
            }
        }
        setFields({
            ...fields,
            [dataset.name]: {
                text: value,
                isValid,
                borderColor: isValid ? "green" : isValid === null ? "#dfdfdf" : "red"
            }
        });
    };
    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        data-name="username"
                        value={username.text}
                        onChange={handleChange}
                        style={{
                            borderBottomColor: username.borderColor
                        }}
                        required
                    />
                    <ToolTip
                        visibility={username.isValid === null || username.isValid ? "hidden" : "visible"}
                    >
                        username can only include numbers, letters, and _
                    </ToolTip>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="email"
                        data-name="email"
                        value={fields.email.text}
                        onChange={handleChange}
                        style={{
                            borderBottomColor: email.borderColor
                        }}
                        required
                    />
                    <ToolTip visibility={email.isValid === null || email.isValid ? "hidden" : "visible"}>
                        please enter a valid email address
                    </ToolTip>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="password"
                        data-name="password"
                        value={fields.password.text}
                        onChange={handleChange}
                        style={{
                            borderBottomColor: password.borderColor
                        }}
                        required
                    />
                    <ToolTip
                        visibility={password.isValid === null || password.isValid ? "hidden" : "visible"}
                    >
                        password must contain '!' or '?', and at least one capitalized letter
                    </ToolTip>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </FormContainer>
    );
};

export default RegistrationPage;
