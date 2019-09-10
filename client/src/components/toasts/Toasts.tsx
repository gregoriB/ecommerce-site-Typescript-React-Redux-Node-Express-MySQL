import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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

const ToastContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    bottom: 1vh;
    right: 2vw;
    width: 25vw;
    z-index: 100000;
`;
