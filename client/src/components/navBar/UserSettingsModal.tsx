import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import AccountDelete from "./AccountDelete";
import EmailSettings from "./EmailSettings";
import queryDatabase from "../../helpers/queryDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    show: boolean;
    userData: any;
    onHide(): void;
    updateUserData(val: any): void;
}

const UserSettingsModal: React.FC<IProps> = ({ userData, updateUserData, onHide, ...rest }) => {
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
    const closeBtnRef = useRef<any>(null);
    useEffect(() => {
        // focus save button if changes were made
        if (!isEditingEmail && email !== initialEmailState) {
            closeBtnRef && closeBtnRef.current.focus();
        }
    }, [isEditingEmail]);

    return (
        <Modal
            {...rest}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleCloseModal}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{
                        color: "#6c757d",
                        width: "100%",
                        textAlign: "center"
                    }}
                >
                    <FontAwesomeIcon icon="cog" style={{ float: "left" }} />
                    {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: "15vh", display: "flex" }}>
                <EmailSettings
                    setIsEditingEmail={setIsEditingEmail}
                    isEditingEmail={isEditingEmail}
                    email={email}
                    setEmail={setEmail}
                    isDeleteOpen={isDeleteOpen}
                />
            </Modal.Body>
            {isDeleteOpen && <AccountDelete userData={userData} updateUserData={updateUserData} />}
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
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
            </Modal.Footer>
        </Modal>
    );
};

export default UserSettingsModal;
