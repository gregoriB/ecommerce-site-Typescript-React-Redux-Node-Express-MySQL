import React from "react";
import { Modal } from "react-bootstrap";

interface IProps {
    show: boolean;
    setShow(val: boolean): void;
}

const LoginAlert: React.FC<IProps> = ({ show, setShow }) => {
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Incorrect login information. Please try again.</Modal.Body>
        </Modal>
    );
};

export default LoginAlert;
