import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from "./components/Home/Home";
import About from "./components/About/About";
import {BrowserRouter, Route, Switch} from "react-router-dom";


const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/about" component={About}/>
      </Switch>
    </BrowserRouter>,
    rootElement
);