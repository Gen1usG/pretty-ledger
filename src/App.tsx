import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Statistics} from './views/Statistics';
import {Charts} from './views/Charts';
import {NoMatch} from './views/NoMatch';
import {Money} from './views/Money';
import {CustomTag} from './views/CustomTag';

require('icons/charts.svg');

const data = {
  "2020": {
    "01": [],
    "02":[],
  }
};
const theR = [{
  "tag": {
    "id": 2,
    "name": "dailyNecessary",
    "tagName": "日用品",
    "category": "-",
    "show": true,
    "custom": false
  }, "note": "纸巾", "account": 999, "category": "-", "createAt": "2020-06-12T03:18:18.762Z"
}, {
  "tag": {"id": 15, "name": "part-time", "tagName": "兼职", "category": "+", "show": true, "custom": false},
  "note": "便利店",
  "account": 6666,
  "category": "+",
  "createAt": "2020-06-12T03:18:59.537Z"
}, {
  "tag": {"id": 16, "name": "custom", "tagName": "英雄联盟", "category": "-", "show": true, "custom": true},
  "note": "买皮肤",
  "account": 999,
  "category": "-",
  "createAt": "2020-06-12T03:23:48.594Z"
}, {
  "tag": {"id": 10, "name": "snacks", "tagName": "零食", "category": "-", "show": true, "custom": false},
  "note": "hahaha",
  "account": 88,
  "category": "-",
  "createAt": "2020-06-13T17:39:16.696Z"
}, {
  "tag": {"id": 11, "name": "sport", "tagName": "运动", "category": "-", "show": true, "custom": false},
  "note": "sddsds",
  "account": 99,
  "category": "-",
  "createAt": "2020-06-13T17:39:19.934Z"
}, {
  "tag": {"id": 7, "name": "relation", "tagName": "人情", "category": "-", "show": true, "custom": false},
  "note": "sessee",
  "account": 998,
  "category": "-",
  "createAt": "2020-06-13T17:39:26.807Z"
}, {
  "tag": {"id": 4, "name": "gift", "tagName": "礼物", "category": "-", "show": true, "custom": false},
  "note": "sesrr",
  "account": 88,
  "category": "-",
  "createAt": "2020-06-13T17:39:32.207Z"
}, {
  "tag": {"id": 1, "name": "car", "tagName": "汽车", "category": "-", "show": true, "custom": false},
  "note": "sxxxx",
  "account": 66,
  "category": "-",
  "createAt": "2020-06-13T17:39:36.752Z"
}, {
  "tag": {"id": 15, "name": "part-time", "tagName": "兼职", "category": "+", "show": true, "custom": false},
  "note": "",
  "account": 555,
  "category": "+",
  "createAt": "2020-06-13T17:39:39.836Z"
}, {
  "tag": {"id": 14, "name": "salary", "tagName": "工资", "category": "+", "show": true, "custom": false},
  "note": "rr",
  "account": 99,
  "category": "+",
  "createAt": "2020-06-13T17:39:44.006Z"
}, {
  "tag": {"id": 13, "name": "financial", "tagName": "理财", "category": "+", "show": true, "custom": false},
  "note": "ttt",
  "account": 555,
  "category": "+",
  "createAt": "2020-06-13T17:39:48.148Z"
}, {
  "tag": {"id": 10, "name": "snacks", "tagName": "零食", "category": "-", "show": true, "custom": false},
  "note": "enen",
  "account": 55,
  "category": "-",
  "createAt": "2020-06-13T19:22:27.373Z"
}];

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
        <Route exact path="/CustomTag/:category">
          <CustomTag/>
        </Route>
        <Route>
          <NoMatch/>
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
