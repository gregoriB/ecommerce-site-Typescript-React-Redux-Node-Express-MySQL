import React, { useState, useEffect } from "react";
import SidePanel from "./SidePanel";
import Products from "./Products";
import BSToast from "./Toast";
import styled from "styled-components";

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    background-color: darkgray;
    width: 95vw;
    margin: 0 auto;
`;

const ToastContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    bottom: 1vh;
    right: 2vw;
    width: 25vw;
`;

interface IProps {
    productArr: number[];
}

const Main: React.FC<IProps> = ({ productArr }) => {
    const [activeToasts, setActiveToasts] = useState<React.ReactChild[]>([]);

    useEffect(() => {
        setActiveToasts(
            productArr.map((item, index) => (
                <BSToast item={Number(item)} key={index} />
            ))
        );
    }, [productArr]);
    return (
        <MainDiv>
            <SidePanel />
            <Products />
            <ToastContainer>{activeToasts}</ToastContainer>
        </MainDiv>
    );
};

export default Main;
