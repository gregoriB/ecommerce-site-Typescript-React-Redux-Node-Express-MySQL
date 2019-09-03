import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AccountDelete from "./AccountDelete";
import EmailSettings from "./EmailSettings";
import queryDatabase from "../../helpers/queryDatabase";

interface IProps {
    show: boolean;
    userData: any;
    onHide(): void;
    updateUserData(val: any): void;
}

const UserSettingsModal: React.FC<IProps> = ({ userData, updateUserData, onHide, ...rest }) => {
    const emailInitialState = userData.email;
    const { name } = userData;
    const [email, setEmail] = useState(emailInitialState);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteOpen(prevState => !prevState);
    };

    const handleCloseModal = () => {
        onHide();
        setIsDeleteOpen(false);
        setIsEditingEmail(false);
        setEmail(userData.email);
    };

    const checkHasEmailChanged = () => {
        return !(userData.email === email);
    };

    const determineSaveEmailOrCloseModal = () => {
        if (!checkHasEmailChanged()) {
            return handleCloseModal();
        }
        updateUserEmailInDB();
    };

    const updateUserEmailInDB = async () => {
        const query = { oldEmail: userData.email, newEmail: email };
        const dbQuery = { path: "user/update", query, method: "PUT" };
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

    return (
        <Modal
            {...rest}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleCloseModal}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{name} Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EmailSettings
                    setIsEditingEmail={setIsEditingEmail}
                    isEditingEmail={isEditingEmail}
                    userData={userData}
                    email={email}
                    setEmail={setEmail}
                />
            </Modal.Body>
            {isDeleteOpen && <AccountDelete userData={userData} updateUserData={updateUserData} />}
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outline-danger" onClick={handleDeleteClick} disabled={isEditingEmail}>
                    {isDeleteOpen ? "Cancel" : "Delete this account"}
                </Button>
                <Button
                    variant={!checkHasEmailChanged() ? "primary" : "success"}
                    onClick={determineSaveEmailOrCloseModal}
                    disabled={isEditingEmail}
                >
                    {checkHasEmailChanged() ? "Save & Close" : "Close Settings"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserSettingsModal;
