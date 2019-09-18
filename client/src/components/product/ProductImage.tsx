import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ImageModal from "./ImageModal";

type image = { image: string };
type allowModal = { allowModal: boolean };

const ProductImage: React.FC<image & allowModal> = ({ image, allowModal }) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleClick = () => {
        !isImageModalOpen && setIsImageModalOpen(true);
    };
    return (
        <ImageContainer>
            <ImageDiv image={image} onClick={handleClick} />

            {allowModal && (
                <ImageModalContainer className="image-modal-container">
                    <StyleSearchPlusIcon icon="search-plus" size="2x" />
                    <ImageModal
                        image={image}
                        show={isImageModalOpen}
                        onHide={() => setIsImageModalOpen(false)}
                    />
                </ImageModalContainer>
            )}
        </ImageContainer>
    );
};

export default ProductImage;

/* ~~~~~~ -- styling -- ~~~~~~ */

const ImageContainer = styled.div`
    padding: 0.5rem;
    position: relative;
    width: 100%;
    height: 200px;
    max-height: 100vh;
`;

const ImageModalContainer = styled.div`
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const StyleSearchPlusIcon = styled(FontAwesomeIcon)`
    pointer-events: none;
    cursor: pointer;
    position: absolute;
    top: 42%;
    left: 46%;
    opacity: 0;
    height: 35px;
    width: 35px;
    color: #363636;
    transition: opacity 0.2s;
`;

const ImageDiv = styled.div<image>`
    width: 100%;
    height: 100%;
    max-height: 500px;
    cursor: pointer;
    background-image: url(${props => props.image});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transition: opacity 0.2s;
    :hover {
        opacity: 0.5;
        transition: opacity 0.2s;
    }
    &:hover + ${ImageModalContainer} ${StyleSearchPlusIcon} {
        opacity: 1;
        transition: opacity 1s;
    }
`;
