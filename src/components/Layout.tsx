import React from 'react';
import styled from 'styled-components';
import {Nav} from './Nav';

const Wrapper = styled.div`
    height: 100vh;  
    display: flex;
    flex-direction: column;
    
`;
const Main = styled.div`
    overflow: auto;
    height: 100vh - 57px;
    flex-grow: 1;
`;

function Layout(props: any) {
  return (
    <Wrapper>
      <Main data-x='fuck'>
        {props.children}
      </Main>
      <Nav/>
    </Wrapper>
  );
}

export { Layout }