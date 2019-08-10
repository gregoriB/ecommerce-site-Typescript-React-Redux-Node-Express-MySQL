import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import Magnifier from "react-magnifier";

interface IProps {
    image: string;
    show: boolean;
    onHide(): void;
}

const CloseModal = styled.div`
    cursor: pointer;
    padding: 0;
    position: absolute;
    top: 0;
    right: 10rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    color: #f8f9fa;
    text-align: center;
    :hover {
        color: white;
    }
`;

const ImageModal: React.FC<IProps> = props => {
    const magnifierOptions = {
        alt: "",
        title: "",
        src: props.image,
        width: "50%",
        height: "auto",
        zoomFactor: 1,
        mgWidth: 200,
        mgHeight: 200,
        position: "relative"
    };

    return (
        <Modal
            animation={false}
            className="image-modal"
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onClick={props.onHide}
        >
            <CloseModal className="close" style={{ userSelect: "none" }}>
                x
            </CloseModal>
            <Magnifier {...magnifierOptions} mgShape={undefined} />
        </Modal>
    );
};

export default ImageModal;
