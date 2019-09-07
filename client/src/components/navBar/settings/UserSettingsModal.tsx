import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import AccountDelete from "./AccountDelete";
import EmailSettings from "./EmailSettings";
import queryDatabase from "../../../helpers/queryDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    show: boolean;
    userData: any;
    onHide(): void;
    updateUserData(val: any): void;
}

const UserSettingsModal: React.FC<any> = ({ userData, updateUserData, onHide, show }) => {
    const initialEmailState = userData.email;
    const { name } = userData;
    const [email, setEmail] = useState(initialEmailState);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteOpen(prevState => !prevState);
    };

    const handleCloseModal = () => {
        onHide();
        setIsDeleteOpen(false);
        setIsEditingEmail(false);
        setEmail(initialEmailState);
    };

    const checkHasEmailChanged = () => {
        return !(initialEmailState === email);
    };

    const determineSaveEmailOrCloseModal = () => {
        if (!checkHasEmailChanged()) {
            return handleCloseModal();
        }
        updateUserEmailInDB();
    };

    const updateUserEmailInDB = async () => {
        const query = { oldEmail: initialEmailState, newEmail: email };
        const dbQuery = { path: `user/${initialEmailState}`, query, method: "PUT" };
        const data = await queryDatabase(dbQuery);
        if (data && data.affectedRows) {
            updateUserEmailInStore();
            onHide();
            setIsDeleteOpen(false);
        }
    };

    const updateUserEmailInStore = () => {
        const payload = { ...userData, email };
        const action = { type: "UPDATE_USER_DATA", payload };
        updateUserData(action);
    };
    const closeBtnRef = useRef<any>(null);
    useEffect(() => {
        // focus save button if changes were made
        if (!isEditingEmail && email !== initialEmailState) {
            closeBtnRef && closeBtnRef.current && closeBtnRef.current.focus();
        }
    }, [isEditingEmail, email, initialEmailState, closeBtnRef]);

    return (
        <StyledModal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleCloseModal}
            dialogClassName="modal-40w"
        >
            <Modal.Header closeButton>
                <StyledModalTitle id="contained-modal-title-vcenter">
                    <StyledCogIcon icon="cog" />
                    {name}
                </StyledModalTitle>
            </Modal.Header>
            <StyledModalBody>
                <EmailSettings
                    setIsEditingEmail={setIsEditingEmail}
                    isEditingEmail={isEditingEmail}
                    email={email}
                    setEmail={setEmail}
                    isDeleteOpen={isDeleteOpen}
                />
            </StyledModalBody>
            {isDeleteOpen && <AccountDelete userData={userData} updateUserData={updateUserData} />}
            <StyledModalFooter>
                <Button variant="outline-danger" onClick={handleDeleteClick} disabled={isEditingEmail}>
                    {isDeleteOpen ? "Cancel" : "Delete this account"}
                </Button>
                <Button
                    variant={!checkHasEmailChanged() ? "outline-primary" : "success"}
                    onClick={determineSaveEmailOrCloseModal}
                    disabled={isEditingEmail}
                    ref={closeBtnRef}
                >
                    {checkHasEmailChanged() ? "Save & Close" : "Close Settings"}
                </Button>
            </StyledModalFooter>
        </StyledModal>
    );
};

export default UserSettingsModal;

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledModal = styled(Modal)`
    &.modal-40w {
        max-width: 40%;
    }
`;

const StyledModalTitle = styled(Modal.Title)`
    color: #6c757d;
    width: 100%;
    text-align: center;
`;

const StyledCogIcon = styled(FontAwesomeIcon)`
    float: left;
`;

const StyledModalBody = styled(Modal.Body)`
    &.modal-body {
        min-height: 10vh;
        display: flex;
    }
`;

const StyledModalFooter = styled(Modal.Footer)`
    &.modal-footer {
        display: flex;
        justify-content: space-between;
    }
`;
