import React from "react";
import styled from "styled-components";

const CheckoutPage = () => {
    return (
        <BannerContainer>
            <ConstructionBanner
                src={require("../../../images/underconstruction.png")}
            ></ConstructionBanner>
        </BannerContainer>
    );
};

export default CheckoutPage;

const BannerContainer = styled.div`
    margin-top: 10%;
    width: 100%;
    height: 80%;
    text-align: center;
`;

const ConstructionBanner = styled.img`
    width: 50%;
`;
