import './SystemError.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SystemError extends Component {
    render() {
        return (
            <div className="system-error">
                <Link to="/">返回首页</Link>
            </div>
        );
    }
}
