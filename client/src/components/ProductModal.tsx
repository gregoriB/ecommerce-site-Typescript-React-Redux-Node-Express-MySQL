import React, { useState } from "react";
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
    addToCart(val: number): IActionAdd;
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
        /* padding: 1rem; */
        outline: none;
    `,
    Desc = styled.p`
        white-space: pre-wrap;
        max-width: 60%;
    `,
    Price = styled.h4`
        margin: 2rem 0;
    `;

const ProductModal: React.FC<IProps> = props => {
    const { image, title, price, addToCart, index, onHide, descLong } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleImageModal = () => {
        console.log("clicked");
        setIsModalOpen(prevState => !prevState);
    };

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
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
                            src={image}
                            tabIndex={1}
                            onClick={toggleImageModal}
                        />
                        <Button
                            onClick={toggleImageModal}
                            variant="secondary"
                            size="sm"
                        >
                            <FontAwesomeIcon icon="search-plus" size="lg" />
                            <br />
                            view larger image
                        </Button>
                        <ImageModal
                            image={image}
                            show={isModalOpen}
                            onHide={() => setIsModalOpen(false)}
                        />
                        <Price>${price}</Price>
                        <Button
                            variant="primary"
                            style={{ width: 200 }}
                            size="lg"
                            onClick={() => addToCart(index)}
                        >
                            Add to cart
                            <FontAwesomeIcon
                                icon="shopping-cart"
                                style={{ margin: "0 1rem" }}
                                size="sm"
                            />
                        </Button>
                    </div>
                </div>
            </FlexContainer>
        </Modal>
    );
};

export default ProductModal;
