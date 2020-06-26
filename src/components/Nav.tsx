import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {Icon} from './Icon';
import React from 'react';

const NavWrapper = styled.ul`
  display: flex;
  background: #fff;
  margin-bottom: 0;
  > li{
    width: 33.33%;
    >a { 
      border-top: 1px solid rgba(0,0,0,.2);
      height: 57px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding: 5px 0;    
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      -webkit-user-select: none;
      -moz-user-select: none; 
      .icon{
          width: 26px;
          height: 26px;
          vertical-align: -0.15em;
          fill: black;
          overflow: hidden;
       }
      &.selected{
        color:#ffda44;
        .icon{
          fill:#ffda44;
        }
        &:hover{
          color: #ffda44;
        }
      }
      &:hover{
        color:black;
      }
    }
  }
`;

function Nav() {
  return (
    <NavWrapper>
      <li>
        <NavLink to="/Money" activeClassName='selected'>
          <Icon className='icon' name={'money'}/> 记账
        </NavLink>
      </li>
      <li>
        <NavLink to="/Statistics" activeClassName='selected'>
          <Icon className='icon' name={'statistics'}/>明细</NavLink>
      </li>
      <li>
        <NavLink to="/Charts" activeClassName='selected'>
          <Icon className='icon' name={'charts'}/>图表</NavLink>
      </li>
    </NavWrapper>
  );
}

export {Nav};