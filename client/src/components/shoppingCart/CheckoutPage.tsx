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
    left: 0;
    margin: 0 auto;
    height: 80%;
    text-align: center;
    @media (min-width: 1600px) {
        left: calc((100vw - 1600px) / 2);
    }
`;

const ConstructionBanner = styled.img`
    width: 50%;
`;
