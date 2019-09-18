import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { stdBreakPoint } from "../../helpers/breakPoints";

interface IProps {
    toasts: React.ReactChild[];
}

const Toasts: React.FC<IProps> = ({ toasts }) => {
    return <ToastContainer>{toasts}</ToastContainer>;
};

interface IState {
    toasts: React.ReactChild[];
}

const mapStateToProps = (state: IState) => ({
    toasts: state.toasts
});

export default connect(mapStateToProps)(Toasts);

/* ~~~~~~ -- styling -- ~~~~~~ */

const ToastContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    bottom: 1vh;
    right: 2vw;
    width: 25vw;
    max-height: 90vh;
    z-index: 1051;
    @media (max-width: ${stdBreakPoint}px) {
        width: 100vw;
        align-items: flex-end;
        right: 0;
        bottom: 0;
    }
`;
