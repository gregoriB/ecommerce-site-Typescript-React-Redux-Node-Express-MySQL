import React from 'react';
import SidePanel from './SidePanel';
import Products from './Products';
import styled from 'styled-components';

const MainDiv = styled.div`
    position: absolute;
    top: 5vh;
    left: 0;
    display: flex;
    background-color: tomato;
    width: 100vw;
    height: 95vh;
`

const Main = () => {
    return (
        <MainDiv className='main'>
            <SidePanel />
            <Products />
        </MainDiv>
    );
}

export default Main;