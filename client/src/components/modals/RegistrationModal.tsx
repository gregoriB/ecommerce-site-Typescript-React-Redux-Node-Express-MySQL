import React from "react";
import { Modal } from "react-bootstrap";
import RegistrationForm from "../navBar/RegistrationForm";
import styled from "styled-components";

const Header = styled.h4`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IProps {
    show: boolean;
    onHide(): void;
    updateUserData(val: any): any;
}

const RegistrationModal: React.FC<IProps> = ({ updateUserData, onHide, ...rest }) => {
    return (
        <Modal {...rest} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton onClick={onHide} style={{ position: "relative" }}>
                <Header>Register New Account</Header>
            </Modal.Header>

            <RegistrationForm updateUserData={updateUserData} />
        </Modal>
    );
};

export default RegistrationModal;
