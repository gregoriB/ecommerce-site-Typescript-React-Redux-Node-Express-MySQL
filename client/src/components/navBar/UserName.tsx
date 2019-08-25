import React from "react";
import styled from "styled-components";

const UserGreeting = styled.div`
    font-style: italic;
    margin: 0 2rem;
`;

interface IProps {
    results: any;
}

const UserName: React.FC<IProps> = ({ results }) => {
    return <UserGreeting>Welcome back, {results.email}</UserGreeting>;
};

export default UserName;
