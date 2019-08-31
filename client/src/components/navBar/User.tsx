import React, { useState } from "react";
import styled from "styled-components";
import { Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserSettingsModal from "./UserSettingsModal";

const UserName = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    color: #545b62;
`;

const LogoutContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        margin-right: 0.5rem;
    }
`;

interface IProps {
    userData: any;
    updateUserData(val: any): any;
}

const User: React.FC<IProps> = ({ userData, updateUserData }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);
    const handleLogout = () => {
        updateUserData({ type: "DELETE_USER_DATA", payload: null });
    };

    const handleSettingsClick = () => {
        setIsSettingsOpen(true);
    };
    return (
        <>
            <UserSettingsModal
                show={isSettingsOpen}
                onHide={() => setIsSettingsOpen(false)}
                userData={userData}
                updateUserData={updateUserData}
            />
            <UserName>{userData.name}</UserName>
            <DropdownButton
                alignRight
                variant="primary"
                size="sm"
                title={<FontAwesomeIcon icon="user" />}
                id="dropdown-menu-align-right"
                style={{ color: "black", background: "none" }}
            >
                <Dropdown.Item as="button" onClick={handleSettingsClick}>
                    User Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Nav.Link onClick={handleLogout}>
                    <LogoutContainer>
                        <span>Logout</span>
                        <FontAwesomeIcon icon="sign-out-alt" />
                    </LogoutContainer>
                </Nav.Link>
            </DropdownButton>
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0 1rem"
                }}
            ></span>
        </>
    );
};

export default User;
