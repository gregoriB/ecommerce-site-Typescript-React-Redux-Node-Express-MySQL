import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Toasts: React.FC<any> = ({ toasts }) => {
    const [mappedToasts, setMappedToasts] = useState<any>([]);
    useEffect(() => {
        toasts.length && setMappedToasts(toasts.map((product: any) => product));
    }, [toasts]);
    return <ToastContainer>{mappedToasts}</ToastContainer>;
};

interface IState {
    toasts: any;
}

const mapStateToProps = (state: IState) => ({
    toasts: state.toasts.toastArr
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
