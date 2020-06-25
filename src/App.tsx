import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Statistics} from './views/Statistics';
import {Charts} from './views/Charts';
import {NoMatch} from './views/NoMatch';
import {Money} from './views/Money';
import {CustomTag} from './views/CustomTag';
import {EditTag} from './views/EditTag';
import styled from 'styled-components';

const AppWrapper = styled.div`
   background-color: #fff;
   margin:0 auto;
   max-width:450px;
   ::-webkit-scrollbar {
      display: none;
   }
`;

function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Statistics"/>
          </Route>
          <Route exact path="/Money">
            <Money/>
          </Route>
          <Route exact path="/Statistics">
            <Statistics/>
          </Route>
          <Route exact path="/Charts">
            <Charts/>
          </Route>
          <Route exact path="/CustomTag/:category">
            <CustomTag/>
          </Route>
          <Route exact path="/EditTag/:id">
            <EditTag/>
          </Route>
          <Route>
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}


export default App;
