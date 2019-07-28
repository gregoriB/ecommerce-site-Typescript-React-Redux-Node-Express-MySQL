import React from "react";
import styled from "styled-components";
import { ListGroup, Button } from "react-bootstrap";

const Panel = styled.div`
    margin: 1rem;
    margin-right: 0;
`;

const SidePanel = () => {
    return (
        <Panel>
            <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                <Button>Filter</Button>
            </ListGroup>
        </Panel>
    );
};

export default SidePanel;
