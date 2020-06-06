import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Statistics} from './views/Statistics';
import {Charts} from './views/Charts';
import {NoMatch} from './views/NoMatch';
import {Money} from './views/Money';

require('icons/charts.svg');

function App() {
  return (
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
        <Route>
          <NoMatch/>
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
