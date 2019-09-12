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
        width: "unset",
        height: "unset",
        zoomFactor: 1.8,
        mgWidth: 120,
        mgHeight: 120,
        mgBorderWidth: 1
    };

    return (
        <StyledImageModal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <ModalBody>
                <CloseModal onClick={onHide}>
                    <FontAwesomeIcon icon="times" />
                </CloseModal>
                <StyledMagnifier {...magnifierOptions} mgShape={undefined} />
            </ModalBody>
        </StyledImageModal>
    );
};

export default ImageModal;

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledImageModal = styled(Modal)`
    background: rgba(0, 0, 0, 0.5);
    .modal-dialog {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        max-width: 80vw;
        max-height: 100vh;
        transform: none !important;
        transition: 0.2s;
    }
    .modal-content {
        margin: 0 auto;
        background: none;
        border: none;
        width: unset;
    }
`;

const ModalBody = styled.div`
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const CloseModal = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    color: #f8f9fa;
    padding: 0.25rem 0.5rem;
    margin: 0;
    user-select: none;
    z-index: 2;
    cursor: pointer;
    mix-blend-mode: difference;
`;

const StyledMagnifier = styled(Magnifier)`
    &.magnifier img {
        width: unset;
        max-width: 90vw;
        height: unset;
        max-height: 90vh;
    }
`;
