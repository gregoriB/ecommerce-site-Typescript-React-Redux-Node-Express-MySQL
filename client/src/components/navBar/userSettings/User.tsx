import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteUserData } from "../../../store/actions/actionCreators";
import styled from "styled-components";
import { Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserSettingsModal from "./UserSettingsModal";

const User: React.FC<any> = ({ userName, deleteUserData }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const handleLogout = () => {
        deleteUserData();
    };

    const handleSettingsClick = () => {
        setIsSettingsOpen(true);
    };
    return (
        <>
            <UserSettingsModal show={isSettingsOpen} onHide={() => setIsSettingsOpen(false)} />
            <UserName>{userName}</UserName>
            <StyledDropdownButton
                alignRight
                variant="primary"
                size="sm"
                title={<FontAwesomeIcon icon="user" />}
                id="dropdown-menu-align-right"
            >
                <StyledDropdownItem as="button" onClick={handleSettingsClick}>
                    User Settings
                </StyledDropdownItem>
                <Dropdown.Divider />
                <Nav.Link onClick={handleLogout}>
                    <LogoutContainer>
                        <span>Logout</span>
                        <FontAwesomeIcon icon="sign-out-alt" />
                    </LogoutContainer>
                </Nav.Link>
            </StyledDropdownButton>
        </>
    );
};

interface IState {
    userData: any;
}

const mapStateToProps = (state: IState) => ({
    userName: state.userData.name
});

const actionCreators = {
    deleteUserData
};

export default connect(
    mapStateToProps,
    actionCreators
)(User);

/* ~~~~~~ -- styling -- ~~~~~~ */

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

const StyledDropdownButton = styled(DropdownButton)`
    margin-right: 2rem;
    button {
        background: none;
        border: none;
        color: #007bff;
    }
`;

const StyledDropdownItem = styled(Dropdown.Item)`
    background: none;
    color: #545b62 !important;
    border: none;
    width: 100%;
    margin: 0 auto;
    :hover {
        transition: 0.2s;
        color: white !important;
        background: #007bff;
    }
`;
