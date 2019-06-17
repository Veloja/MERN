import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const routing = (
    <Router>
        <div>
            <Route exact path="/register" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
