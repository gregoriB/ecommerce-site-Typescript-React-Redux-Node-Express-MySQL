import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { IActionAdd } from "../actions/addToCart";
import styled from "styled-components";
import ImageModal from "./ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
    show: boolean;
    index: number;
    image: string;
    title: string;
    desc: string;
    descLong: string;
    price: number;
    onHide(): void;
    addToCart?(val: number): IActionAdd;
}

const FlexContainer = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        height: 100%;
        margin: 5vh auto;
        div {
            display: flex;
            justify-content: space-between;
            div {
                position: relative;
                margin-left: 2rem;
                text-align: center;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
            }
        }
    `,
    CloseModal = styled.div`
        cursor: pointer;
        padding: 2rem;
        position: absolute;
        top: 0;
        right: 0;
    `,
    Title = styled.h2`
        text-align: justify;
        margin: 2rem auto;
        display: block;
    `,
    Image = styled.img`
        cursor: pointer;
        width: 100%;
        height: auto;
        transition: transform 0.2s;
        outline: none;
    `,
    Desc = styled.p`
        white-space: pre-wrap;
        max-width: 60%;
    `,
    Price = styled.h4`
        margin: 1rem;
    `,
    ButtonContainer = styled.span`
        display: flex;
        margin: 2rem auto;
        margin-top: auto;
    `;

const ProductModal: React.FC<IProps> = props => {
    const { image, title, price, index, onHide, descLong, addToCart } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [imageHeight, setImageHeight] = useState<number>(0);

    const toggleImageModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current!.height);
        }
    });

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            title=""
        >
            <CloseModal
                className="close"
                style={{ userSelect: "none" }}
                onClick={onHide}
            >
                x
            </CloseModal>
            <FlexContainer>
                <Title>{title}</Title>
                <div>
                    <Desc>{descLong}</Desc>
                    <div>
                        <Image
                            className="product-image"
                            ref={imageRef}
                            src={image}
                            tabIndex={1}
                            onClick={toggleImageModal}
                        />
                        <FontAwesomeIcon
                            className="search-plus"
                            icon="search-plus"
                            size="2x"
                            style={{ top: imageHeight / 2 }}
                        />
                        <ImageModal
                            image={image}
                            show={isModalOpen}
                            onHide={() => setIsModalOpen(false)}
                        />
                        <ButtonContainer>
                            <Price>${price}</Price>
                            <Button
                                variant="primary"
                                style={{ width: "unset" }}
                                size="lg"
                                onClick={() => addToCart && addToCart(index)}
                            >
                                <FontAwesomeIcon
                                    icon="cart-plus"
                                    style={{ margin: "0 .5rem" }}
                                    size="sm"
                                />
                                Add to cart
                            </Button>
                        </ButtonContainer>
                    </div>
                </div>
            </FlexContainer>
        </Modal>
    );
};

export default ProductModal;
