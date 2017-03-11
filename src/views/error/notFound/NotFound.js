import './NotFound.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <Link to="/">返回首页</Link>
            </div>
        );
    }
}
