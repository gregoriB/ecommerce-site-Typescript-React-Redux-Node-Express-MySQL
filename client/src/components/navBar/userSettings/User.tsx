import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteUserData } from "../../../store/actions/actionCreators";
import { stdBreakPoint } from "../../../helpers/breakPoints";
import { IUserData } from "../../../types/generalTypes";

import UserSettingsModal from "./UserSettingsModal";

interface IProps {
    username: string;
    deleteUserData(): void;
}

const User: React.FC<IProps> = ({ username, deleteUserData }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const handleLogout = () => {
        deleteUserData();
    };

    const handleSettingsClick = () => {
        setIsSettingsOpen(true);
    };
    return (
        <UserContainer>
            <UserSettingsModal show={isSettingsOpen} onHide={() => setIsSettingsOpen(false)} />
            <UserName>{username}</UserName>
            <StyledDropdownButton
                alignRight
                variant="primary"
                size="md"
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
        </UserContainer>
    );
};

interface IState {
    userData: IUserData;
}

const mapStateToProps = (state: IState) => ({
    username: state.userData.username
});

const actionCreators = {
    deleteUserData
};

export default connect(
    mapStateToProps,
    actionCreators
)(User);

/* ~~~~~~ -- styling -- ~~~~~~ */

const UserContainer = styled.div`
    display: flex;
    @media (max-width: ${stdBreakPoint}px) {
        justify-content: center;
        padding-top: 1rem;
        padding-bottom: 2rem;
        width: 100%;
    }
`;

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
    @media (min-width: ${stdBreakPoint + 1}px) {
        margin-right: 2rem;
    }
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
    padding: 0.5rem 0;
    :hover {
        transition: 0.2s;
        color: white !important;
        background: #007bff;
    }
`;
