import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import ImageModal from "./ImageModal";
import ProductImage from "./ProductImage";
import BtnAddToCart from "../shoppingCart/BtnAddToCart";
import { IProduct, IModalToggle } from "../../types/generalTypes";
import { stdBreakPoint } from "../../helpers/breakPoints";

const ProductModal: React.FC<IProduct & IModalToggle> = ({
    imageURL,
    itemName,
    price,
    onHide,
    descLong,
    show,
    stock
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const descRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        descRef.current && (descRef.current!.innerHTML = descLong);
    });
    return (
        <StyledModal
            onHide={onHide}
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            title=""
        >
            <CloseButton tabIndex={1} className="close" onClick={() => onHide()}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </CloseButton>
            <FlexContainer>
                <Title>{itemName}</Title>
                <Content>
                    <Desc ref={descRef} />
                    <ImageAndCartButton className="image-and-cart-button">
                        <ProductImage allowModal={true} image={imageURL} />
                        <ImageModal
                            image={imageURL}
                            show={isModalOpen}
                            onHide={() => setIsModalOpen(false)}
                        />
                        <ImageAndStockContainer>
                            <ButtonContainer>
                                <BtnAddToCart
                                    stock={stock}
                                    price={price}
                                    itemName={itemName}
                                    text={`$${price} - add to cart`}
                                />
                            </ButtonContainer>
                            <Stock>
                                <div>{stock}</div> in stock
                            </Stock>
                        </ImageAndStockContainer>
                    </ImageAndCartButton>
                </Content>
            </FlexContainer>
        </StyledModal>
    );
};

export default ProductModal;

/* ~~~~~~ -- styling -- ~~~~~~ */

const StyledModal = styled(Modal)`
    &.modal {
        @media (max-width: ${stdBreakPoint}px) {
            padding: 0 !important;
        }
        .modal-dialog {
            margin: 0 auto;
            margin-top: 0;
            @media (max-width: ${stdBreakPoint}px) {
                width: 100% !important;
                max-width: 100% !important;
            }
        }
    }
`;

const FlexContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 100%;
    margin: 5vh auto;
    div {
        display: flex;
    }
`;
const Content = styled.div`
    justify-content: space-around;
    @media (max-width: ${stdBreakPoint}px) {
        justify-content: flex-start;
        flex-direction: column-reverse;
    }
`;
const ImageAndCartButton = styled.div`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: auto;
    max-height: 400px;
    width: 100%;
    @media (max-width: ${stdBreakPoint}px) {
        font-size: 1.2rem;
        text-align: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const ImageAndStockContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    @media (min-width: ${stdBreakPoint + 1}px) {
    }
`;

const Title = styled.h2`
    color: #42484d;
    text-align: center;
    margin: 2rem auto;
    margin-bottom: 4rem;
    display: block;
    width: 80%;
    @media (max-width: ${stdBreakPoint}px) {
        font-size: 1.2rem;
        text-align: center;
        width: 100%;
        margin: 2rem auto;
    }
`;
const Desc = styled.p`
    color: #42484d;
    white-space: pre-wrap;
    max-width: 60%;
    padding-left: 10vw;
    ul {
        display: flex;
        flex-direction: column;
    }
    @media (max-width: ${stdBreakPoint}px) {
        font-size: 0.8rem;
        text-align: justify;
        max-width: 100%;
        padding: 0;
    }
    @media (min-width: 1599px) {
        padding: 0;
    }
`;

const ButtonContainer = styled.span`
    display: flex;
    margin: 0 1rem;
    align-self: center;
`;

const Stock = styled.div`
    margin-left: 2rem;
    @media (max-width: ${stdBreakPoint}px) {
        margin: 0;
        min-width: 120px;
        max-width: 150px;
    }
    div {
        font-weight: 600;
        margin-right: 8px;
        white-space: nowrap;
        word-wrap: none;
    }
`;

const CloseButton = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem 1.2rem;
    margin: 0;
    z-index: 2;
    outline: inital;
    cursor: pointer;
`;
