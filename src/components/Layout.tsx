import React from 'react';
import styled from 'styled-components';
import {Nav} from './Nav';

const Wrapper = styled.div`
    height: 100vh;  
    display: flex;
    flex-direction: column;
    
    
`;
const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    flex-grow: 1;
    ::-webkit-scrollbar {
      display: none;
   }
`;

function Layout(props: any) {
  return (
    <Wrapper>
      <Main id={'main'}>
        {props.children}
      </Main>
      <Nav/>
    </Wrapper>
  );
}

export { Layout }