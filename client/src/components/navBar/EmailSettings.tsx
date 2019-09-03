import React, { useState } from "react";
import styled from "styled-components";
import { validateEmail } from "../../helpers/formValidation";
import { Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    show?: boolean;
    email: string;
    isEditingEmail: boolean;
    isDeleteOpen: boolean;
    setIsEditingEmail(val: boolean): void;
    onHide?(): void;
    updateUserData?(val: any): void;
    setEmail(val: string): void;
}

const EmailSettingsForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    width: 100%;
    .email-settings-group {
        display: flex;
        align-items: center;
        width: 100%;
    }
    p {
        margin: 0;
        cursor: default;
    }
    input {
        width: 100%;
        padding-left: 1rem;
        margin: 0;
        box-sizing: border-box;
    }
    span {
        display: inline-block;
        margin-right: 2rem;
    }
`;

const EditingGroup = styled.div`
    position: relative;
    width: 80%;
    margin-left: calc(-1rem - 1px);
    height: 2rem;
`;

const ToolTip = styled.div`
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
    z-index: 1000;
    border: 1px solid #f8d7da;
`;

const EmailSettings: React.FC<IProps> = ({
    email,
    setEmail,
    isDeleteOpen,
    isEditingEmail,
    setIsEditingEmail
}) => {
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [emailInput, setEmailInput] = useState(email);

    type keyboardEvent = React.ChangeEvent<EventTarget>;

    const handleInputChange = (e: keyboardEvent) => {
        const target = e.currentTarget as HTMLInputElement;
        setEmailInput(target.value);
        const validated = validateEmail(target.value);
        setIsValidEmail(validated);
    };

    type FormElem = React.FormEvent<HTMLFormElement>;

    const handleSubmit = (e: FormElem) => {
        e.preventDefault();
        handleToggleEditClick();
    };

    const handleToggleEditClick = () => {
        if (isEditingEmail) {
            handleEdits();
        }
        setIsEditingEmail(!isEditingEmail);
    };

    const handleEdits = () => {
        if (isValidEmail) {
            setEmail(emailInput);
        } else {
            setEmailInput(email);
        }
        setIsValidEmail(null);
    };

    const determineVariant = () => {
        if (!isEditingEmail) {
            return "outline-secondary";
        } else if (isValidEmail) {
            return "info";
        } else if (isValidEmail === null) {
            return "secondary";
        } else {
            return "danger";
        }
    };
    return (
        <EmailSettingsForm onSubmit={handleSubmit}>
            <div className="email-settings-group">
                <span>EMAIL:</span>
                <EditingGroup>
                    <FormControl
                        className="email-edit"
                        type="email"
                        onChange={handleInputChange}
                        value={emailInput}
                        required
                        style={{
                            borderColor: isValidEmail
                                ? "green"
                                : isValidEmail === null
                                ? "#dfdfdf"
                                : "red"
                        }}
                        disabled={!isEditingEmail}
                    />
                    {isValidEmail === false && <ToolTip>please enter a valid email address</ToolTip>}
                </EditingGroup>
            </div>
            {!isDeleteOpen && (
                <Button
                    variant={determineVariant()}
                    style={{ border: "none" }}
                    onClick={handleToggleEditClick}
                    title="toggle edit mode for changing your email address"
                >
                    <FontAwesomeIcon icon={isEditingEmail ? "times" : "pen"} />
                </Button>
            )}
        </EmailSettingsForm>
    );
};

export default EmailSettings;
