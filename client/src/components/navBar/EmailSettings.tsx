import React, { useState } from "react";
import styled from "styled-components";
import { validateEmail } from "../../helpers/formValidation";
import { Button, FormControl } from "react-bootstrap";

interface IProps {
    show?: boolean;
    userData: any;
    email: string;
    isEditingEmail: boolean;
    setIsEditingEmail(val: boolean): void;
    onHide?(): void;
    updateUserData?(val: any): void;
    setEmail(val: string): void;
}

const EmailSettingsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    userData,
    email,
    setEmail,
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

    return (
        <EmailSettingsContainer>
            <div className="email-settings-group">
                <span>EMAIL:</span>
                {isEditingEmail ? (
                    <EditingGroup>
                        <FormControl
                            type="email"
                            onChange={handleInputChange}
                            value={emailInput}
                            required
                            style={{
                                border: "1px solid transparent",
                                borderColor: isValidEmail
                                    ? "green"
                                    : isValidEmail === null
                                    ? "#dfdfdf"
                                    : "red"
                            }}
                        />
                        {isValidEmail === false && <ToolTip>please enter a valid email address</ToolTip>}
                    </EditingGroup>
                ) : (
                    <p>{email}</p>
                )}
            </div>
            <Button variant="secondary" onClick={handleToggleEditClick}>
                {isEditingEmail ? "finish" : "edit"}
            </Button>
        </EmailSettingsContainer>
    );
};

export default EmailSettings;
