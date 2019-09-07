import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { IData } from "../../types/types";
import ImageModal from "./ImageModal";
import ProductImage from "./ProductImage";
import BtnAddToCart from "../../containers/BtnAddToCart";

const ProductModal: React.FC<any> = ({ imageURL, name, price, onHide, descLong, show, stock }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <StyledModal
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            title=""
        >
            <CloseModal className="close" onClick={onHide}>
                x
            </CloseModal>
            <FlexContainer>
                <Title>{name}</Title>
                <Content>
                    <Desc>{descLong}</Desc>
                    <ImageAndCartButton>
                        <ProductImage allowModal={true} image={imageURL} />
                        <ImageModal
                            image={imageURL}
                            show={isModalOpen}
                            onHide={() => setIsModalOpen(false)}
                        />
                        <Price>${price}</Price>
                        <ButtonContainer>
                            <BtnAddToCart
                                stock={stock}
                                price={price}
                                itemName={name}
                                text="add to cart"
                            />
                        </ButtonContainer>
                    </ImageAndCartButton>
                </Content>
            </FlexContainer>
        </StyledModal>
    );
};

export default ProductModal;

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledModal = styled(Modal)`
    .modal-dialog {
        margin-top: 0;
    }
`;

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
`;
const Content = styled.div`
    justify-content: space-between;
`;
const ImageAndCartButton = styled.div`
    position: relative;
    margin-left: 2rem;
    text-align: center;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-height: 400px;
    width: 100%;
`;
const CloseModal = styled.div`
    cursor: pointer;
    user-select: none;
    padding: 2rem;
    position: absolute;
    top: 0;
    right: 0;
`;
const Title = styled.h2`
    text-align: justify;
    margin: 2rem auto;
    display: block;
`;
const Desc = styled.p`
    white-space: pre-wrap;
    max-width: 60%;
`;
const Price = styled.h4`
    margin: 1rem;
`;
const ButtonContainer = styled.span`
    display: flex;
    margin: 2rem auto;
    margin-top: auto;
`;
