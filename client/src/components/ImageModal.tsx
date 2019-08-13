import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import Magnifier from "react-magnifier";
import { NONAME } from "dns";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

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
        zoomFactor: 1.8,
        mgWidth: 120,
        mgHeight: 120,
        mgBorderWidth: 1
    };

    return (
        <Modal
            className="image-modal"
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onClick={props.onHide}
        >
            <CloseModal className="close">x</CloseModal>
            <Magnifier {...magnifierOptions} mgShape={undefined} />
        </Modal>
    );
};

export default ImageModal;
