import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { IActionAdd } from "../store/actions/addToCart";
import styled from "styled-components";
import ImageModal from "./ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductImage from "./ProductImage";

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
        }
    `,
    Content = styled.div`
        justify-content: space-between;
    `,
    ImageAndCartButton = styled.div`
        position: relative;
        margin-left: 2rem;
        text-align: center;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        max-height: 400px;
        width: 100%;
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

const ProductModal: React.FC<IProps> = ({
    image,
    title,
    price,
    index,
    onHide,
    descLong,
    addToCart,
    ...rest
}) => {
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
            {...rest}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            title=""
        >
            <CloseModal className="close" onClick={onHide}>
                x
            </CloseModal>
            <FlexContainer>
                <Title>{title}</Title>
                <Content>
                    <Desc>{descLong}</Desc>
                    <ImageAndCartButton>
                        <ProductImage allowModal={true} image={image} />
                        <FontAwesomeIcon
                            className="search-plus"
                            icon="search-plus"
                            size="2x"
                            style={{ top: imageHeight / 2 - 17 }}
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
                    </ImageAndCartButton>
                </Content>
            </FlexContainer>
        </Modal>
    );
};

export default ProductModal;
