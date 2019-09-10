import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import RegistrationForm from "./RegistrationForm";
import styled from "styled-components";
import NewAccountWarning from "./NewAccountWarning";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IModalToggle } from "../../../types/generalTypes";

const RegistrationModal: React.FC<IModalToggle> = ({ onHide, show }) => {
    const [isWarning, setIsWarning] = useState(false);
    const [userData, setUserData] = useState();
    const handleHide = () => {
        onHide();
        setIsWarning(false);
    };

    return (
        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleHide}>
            <StyledModalHeader closeButton>
                <FontAwesomeIcon icon="edit" />
                <Header isWarning={isWarning}>{isWarning ? "WARNING" : "Register New Account"}</Header>
            </StyledModalHeader>

            {isWarning ? (
                <NewAccountWarning
                    userData={userData}
                    onHide={onHide}
                    hideWarning={() => setIsWarning(false)}
                />
            ) : (
                <RegistrationForm showWarning={() => setIsWarning(true)} setUserData={setUserData} />
            )}
        </Modal>
    );
};

export default RegistrationModal;

/* ~~~~~~ -- styling -- ~~~~~~ */

type warning = { isWarning: boolean };
const Header = styled.h4<warning>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => (props.isWarning ? "#856404" : undefined)};
    background: ${props => (props.isWarning ? "#fff3cd" : undefined)};
`;

const StyledModalHeader = styled(Modal.Header)`
    position: relative;
    color: #6c757d;
`;
