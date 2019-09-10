import React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import Magnifier from "react-magnifier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IModalToggle } from "../../types/generalTypes";

interface IProps {
    image: string;
}

const ImageModal: React.FC<IProps & IModalToggle> = ({ show, onHide, image }) => {
    const magnifierOptions = {
        alt: "",
        title: "",
        src: image,
        width: "50%",
        height: "auto",
        zoomFactor: 1.8,
        mgWidth: 120,
        mgHeight: 120,
        mgBorderWidth: 1
    };

    return (
        <StyledImageModal
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onClick={onHide}
        >
            <CloseModal icon="times" />
            <StyledMagnifier {...magnifierOptions} mgShape={undefined} />
        </StyledImageModal>
    );
};

export default ImageModal;

/* ~~~~~~ -- styling -- ~~~~~~ */

const CloseModal = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
    user-select: none;
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

const StyledMagnifier = styled(Magnifier)`
    margin: 0 auto;
`;

const StyledImageModal = styled(Modal)`
    background: rgba(0, 0, 0, 0.5);
    .modal-content {
        background: none;
        border: none;
    }
`;
