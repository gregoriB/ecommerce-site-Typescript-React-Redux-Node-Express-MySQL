import React, { useState, useEffect, useRef } from "react";
import styled, { StyledFunction } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageModal from "../components/ItemImageModal";

interface IProps {
    image: string;
}

const imageDiv: StyledFunction<any> = styled.div;

const ImageContainer = styled.div`
    padding: 0.5rem;
    position: relative;
    width: 100%;
    height: 100%;
`;

const ImageDiv = imageDiv`
    width: 100%;
    // height: 100%;
    height: 100%;
    max-height: 500px;
    cursor: pointer;
    // margin: 0.5rem;
    background-image: url(${(props: any) => props.image});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

const ItemImage: React.FC<IProps> = props => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageHeight, setImageHeight] = useState(0);

    const handleClick = () => {
        !isImageModalOpen && setIsImageModalOpen(true);
    };

    const imageRef = useRef<any>(null);

    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current!.height);
        }
    });
    return (
        <ImageContainer>
            <ImageDiv
                ref={imageRef}
                image={props.image}
                className="product-image"
                onClick={handleClick}
            />
            <FontAwesomeIcon
                className="search-plus"
                icon="search-plus"
                size="2x"
                style={{ top: "42%" }}
            />
            <ImageModal
                {...props}
                show={isImageModalOpen}
                onHide={() => setIsImageModalOpen(false)}
            />
        </ImageContainer>
    );
};

export default ItemImage;
