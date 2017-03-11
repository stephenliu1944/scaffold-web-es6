import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { checkLogin } from './hook';
import Frame from '../layouts/frame/Frame';
import Home from '../views/home/Home';
import NotFound from '../views/error/notFound/NotFound';
import SystemError from '../views/error/systemError/SystemError';

export default class Root extends Component {
    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/" component={Frame}>
                    <IndexRoute component={Home} />
                </Route>
                <Route path="/systemError" component={SystemError}/>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
}

