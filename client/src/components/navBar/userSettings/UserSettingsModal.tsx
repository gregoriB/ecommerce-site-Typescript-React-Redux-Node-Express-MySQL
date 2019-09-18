import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateUserData } from "../../../store/actions/actionCreators";
import queryDatabase from "../../../helpers/queryDatabase";
import { stdBreakPoint } from "../../../helpers/breakPoints";
import { IQueryDBArgs, IUserData, IModalToggle } from "../../../types/generalTypes";

import EmailSettings from "./EmailSettings";
import AccountDelete from "./AccountDelete";

interface IProps {
    username: string;
    userEmail: string;
    updateUserData(val: IUserData): void;
}

const UserSettingsModal: React.FC<IProps & IModalToggle> = ({
    username,
    userEmail,
    updateUserData,
    onHide,
    show
}) => {
    const [email, setEmail] = useState(userEmail);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteOpen(prevState => !prevState);
    };

    const handleCloseModal = () => {
        onHide();
        setIsDeleteOpen(false);
        setIsEditingEmail(false);
        setEmail(userEmail);
    };

    const checkHasEmailChanged = () => {
        return !(userEmail === email);
    };

    const determineSaveEmailOrCloseModal = () => {
        if (!checkHasEmailChanged()) {
            return handleCloseModal();
        }
        updateUserEmailInDB();
    };

    const updateUserEmailInDB = async () => {
        const query = { oldEmail: userEmail, newEmail: email };
        const dbQuery: IQueryDBArgs = { path: `user/${userEmail}`, query, method: "PUT" };
        const data: IUserData = await queryDatabase(dbQuery);
        if (data) {
            updateUserEmailInStore();
            onHide();
            setIsDeleteOpen(false);
        }
    };

    const updateUserEmailInStore = () => {
        const payload = { username, email };
        updateUserData(payload);
    };

    const closeBtnRef = useRef<HTMLButtonElement & Button<"button"> | null>(null);
    useEffect(() => {
        // focus save button if changes were made
        if (!isEditingEmail && email !== userEmail) {
            closeBtnRef!.current!.focus();
        }
    }, [isEditingEmail, email, userEmail, closeBtnRef]);

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

                    <div>{username}</div>
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
            {isDeleteOpen && <AccountDelete />}
            <StyledModalFooter>
                <Button variant="outline-danger" onClick={handleDeleteClick} disabled={isEditingEmail}>
                    {isDeleteOpen ? "Cancel" : "Delete this account"}
                </Button>
                <Button
                    variant={!checkHasEmailChanged() ? "outline-primary" : "success"}
                    onClick={determineSaveEmailOrCloseModal}
                    disabled={isEditingEmail}
                    ref={closeBtnRef}
                    tabIndex={1}
                >
                    {checkHasEmailChanged() ? "Save & Close" : "Close Settings"}
                </Button>
            </StyledModalFooter>
        </StyledModal>
    );
};

interface IState {
    userData: IUserData;
}

const mapStateToProps = (state: IState) => ({
    username: state.userData.username,
    userEmail: state.userData.email
});

const actionCreators = {
    updateUserData
};

export default connect(
    mapStateToProps,
    actionCreators
)(UserSettingsModal);

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledModal = styled(Modal)`
    &.modal-40w {
        max-width: 40%;
    }
`;

const StyledModalTitle = styled(Modal.Title)`
    display: flex;
    position: relative;
    align-items: center;
    color: #42484d;
    div {
        margin: 0 2rem;
        @media (max-height: ${stdBreakPoint}px) {
            font-size: 1.2rem;
        }
    }
`;

const StyledCogIcon = styled(FontAwesomeIcon)`
    color: #42484d;
    opacity: 0.7;
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
