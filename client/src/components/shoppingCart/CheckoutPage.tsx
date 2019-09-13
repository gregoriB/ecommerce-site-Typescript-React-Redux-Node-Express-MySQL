import React from "react";
import styled from "styled-components";

const CheckoutPage = () => {
    return (
        <BannerContainer>
            <ConstructionBanner
                src={require("../../images/underconstruction.png")}
                alt="'under construction' banner"
            />
        </BannerContainer>
    );
};

export default CheckoutPage;

const BannerContainer = styled.div`
    position: absolute;
    top: 20vh;
    margin: 0 auto;
    width: 100%;
    height: 80%;
    text-align: center;
`;

const ConstructionBanner = styled.img`
    width: 50%;
`;
