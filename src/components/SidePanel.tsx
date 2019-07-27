import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
    width: 20vw;
    border: 2px solid black;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`

const SidePanel = () => {
    return (
        <Panel>
            <a href="#">Category</a>
            <a href="#">Brand</a>
            <a href="#">Price</a>
            <a href="#">Rating</a>
            <a href="#">Location</a>
        </Panel>
    );
}

export default SidePanel;