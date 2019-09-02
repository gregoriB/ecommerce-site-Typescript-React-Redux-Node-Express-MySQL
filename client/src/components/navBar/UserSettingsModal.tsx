import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AccountDelete from "./AccountDelete";

interface IProps {
    show: boolean;
    onHide(): void;
    userData: any;
    updateUserData(val: any): void;
}

const UserSettingsModal: React.FC<IProps> = ({ userData, updateUserData, onHide, ...rest }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { name, email } = userData;
    const handleDeleteClick = () => {
        setIsDeleteOpen(prevState => !prevState);
    };

    const handleCloseModal = () => {
        onHide();
        setIsDeleteOpen(false);
    };

    return (
        <Modal
            {...rest}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-10w"
            onHide={handleCloseModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{name} Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <strong>EMAIL:</strong> <em>{email}</em>
            </Modal.Body>
            {isDeleteOpen && <AccountDelete userData={userData} updateUserData={updateUserData} />}
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outline-danger" onClick={handleDeleteClick}>
                    {isDeleteOpen ? "Cancel" : "Delete this account"}
                </Button>
                <Button onClick={handleCloseModal}>Close settings</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserSettingsModal;
