import {Icon} from './Icon';
import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffda44;
    border-radius: 50%;
    width: 28px;
    height: 28px;
      .list-icon{
        width: 22px;
        height: 22px;
        vertical-align: -0.15em;
        fill: #343233;
        overflow: hidden;
      }
`;

type Props = {
  name: string;
  className?: string
}

function BeautyIcon(props: Props) {
  return (
    <IconWrapper className={props.className}>
      <Icon name={props.name} className='list-icon'/>
    </IconWrapper>
  );
}

export {BeautyIcon}