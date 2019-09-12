import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import RegistrationForm from "./RegistrationForm";
import styled from "styled-components";
import NewAccountWarning from "./NewAccountWarning";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IModalToggle } from "../../../types/generalTypes";
import { stdBreakPoint } from "../../../helpers/breakPoints";

const RegistrationModal: React.FC<IModalToggle> = ({ onHide, show }) => {
    const [isWarning, setIsWarning] = useState(false);
    const [userData, setUserData] = useState();
    const handleHide = () => {
        onHide();
        setIsWarning(false);
    };

    return (
        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleHide}>
            <Modal.Header style={{ background: isWarning ? "#fff3cd" : undefined }} closeButton>
                <StyledModalTitle id="contained-modal-title-vcenter">
                    <StyleEditIcon icon="edit" />
                    <Header isWarning={isWarning}>
                        {isWarning ? "WARNING" : "Register New Account"}
                    </Header>
                </StyledModalTitle>
            </Modal.Header>
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
const Header = styled.div<warning>`
    align-items: center;
    margin-left: 2rem;
    color: ${props => (props.isWarning ? "#856404" : undefined)};
    font-size: 1.2rem;
    @media (max-width: ${stdBreakPoint}px) {
        margin-left: 0.5rem;
    }
`;

const StyledModalTitle = styled(Modal.Title)`
    display: flex;
    position: relative;
    align-items: center;
    color: #42484d;
    width: 100%;
`;

const StyleEditIcon = styled(FontAwesomeIcon)`
    opacity: 0.7;
    color: #42484d;
`;
