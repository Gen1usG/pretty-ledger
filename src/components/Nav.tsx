import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {Icon} from './Icon';
import React from 'react';

const NavWrapper = styled.ul`
  display: flex;
  box-shadow:rgba(0,0,0,.2) 0 1px 5px 0;
  > li{
    width: 33.33%;
    >a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding: 5px 0;     
      .icon{
          width: 26px;
          height: 26px;
          vertical-align: -0.15em;
          fill: black;
           overflow: hidden;
       }
      &.selected{
        color:#f60;
        .icon{
          fill:#f60;
        }
      }
    }
  }
`;

function Nav() {
  return (
    <NavWrapper>
      <li>
        <NavLink to="/Money" activeClassName='selected'>
          <Icon name={'money'}/> 记账
        </NavLink>
      </li>
      <li>
        <NavLink to="/Statistics" activeClassName='selected'>
          <Icon name={'statistics'}/>明细</NavLink>
      </li>
      <li>
        <NavLink to="/Charts" activeClassName='selected'>
          <Icon name={'charts'}/>图表</NavLink>
      </li>
    </NavWrapper>
  );
}

export {Nav};