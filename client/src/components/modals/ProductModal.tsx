import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IData } from "../../types/types";
import ImageModal from "./ImageModal";
import ProductImage from "../ProductImage";

const ProductModal: React.FC<IData> = ({ imageURL, name, price, onHide, descLong, show }) => {
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
                        <ButtonContainer>
                            <Price>${price}</Price>
                            <StyledButton variant="primary" size="lg">
                                <StyleCartPlusIcon icon="cart-plus" size="sm" />
                                Add to cart
                            </StyledButton>
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
const StyledButton = styled(Button)`
    width: unset;
`;
const StyleCartPlusIcon = styled(FontAwesomeIcon)`
    margin: 0 0.5rem;
`;
