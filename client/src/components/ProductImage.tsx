import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageModal from "./modals/ImageModal";

type image = { image: string };
type allowModal = { allowModal: boolean };

const ImageContainer = styled.div`
    padding: 0.5rem;
    position: relative;
    width: 100%;
    height: 100%;
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
`;

const ProductImage: React.FC<allowModal & image> = ({ image, allowModal }) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    // const [imageHeight, setImageHeight] = useState(0);

    const handleClick = () => {
        !isImageModalOpen && setIsImageModalOpen(true);
    };

    // const imageRef = useRef<any>(null);

    // useEffect(() => {
    //     if (imageRef.current) {
    //         setImageHeight(imageRef.current!.height);
    //     }
    // });
    return (
        <ImageContainer className="image-container">
            <ImageDiv
                // ref={imageRef}
                // allowModal={allowModal}
                image={image}
                className="product-image"
                onClick={handleClick}
            />

            {allowModal && (
                <div className="image-modal-container">
                    <FontAwesomeIcon
                        className="search-plus"
                        icon="search-plus"
                        size="2x"
                        style={{ top: "42%" }}
                    />
                    <ImageModal
                        image={image}
                        show={isImageModalOpen}
                        onHide={() => setIsImageModalOpen(false)}
                    />
                </div>
            )}
        </ImageContainer>
    );
};

export default ProductImage;
