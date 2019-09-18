import React from "react";
import styled from "styled-components";

import { maxWidth } from "../../helpers/breakPoints";

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
    @media (min-width: ${maxWidth}px) {
        left: calc((100vw - ${maxWidth}px) / 2);
    }
`;

const ConstructionBanner = styled.img`
    width: 50%;
`;
