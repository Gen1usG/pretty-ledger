import React from 'react';
import styled from 'styled-components';
import {HashRouter as Router, Switch, Route, NavLink, Redirect} from "react-router-dom";
import {Bookkeeping} from 'views/Bookkeeping';
import {Statistics} from './views/Statistics';
import {Charts} from './views/Charts';
import {NoMatch} from './views/NoMatch';
import {Icon} from './components/Icon';

require('icons/charts.svg');

const Nav = styled.ul`
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
    }
  }
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column-reverse;
   height:100vh;
   width: 100%;
`;

const Main = styled.div`
    flex-grow: 1;
`;



function App() {
  return (
    <Router>
      <Wrapper>
        <Nav>
          <li>
            <NavLink to="/Bookkeeping">
              <Icon  name={'bookkeeping'}/> 记账
            </NavLink>
          </li>
          <li>
            <NavLink to="/Statistics">
              <Icon  name={'statistics'}/>明细</NavLink>
          </li>
          <li>

            <NavLink to="/Charts">
              <Icon  name={'charts'}/>图表</NavLink>
          </li>
        </Nav>

        <Main>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Statistics"/>
            </Route>
            <Route exact path="/Bookkeeping">
              <Bookkeeping/>
            </Route>
            <Route exact path="/Statistics">
              <Statistics/>
            </Route>
            <Route exact path="/Charts">
              <Charts/>
            </Route>
            <Route>
              <NoMatch/>
            </Route>
          </Switch>
        </Main>
      </Wrapper>
    </Router>
  );
}


export default App;
