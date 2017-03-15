'use strict';

// import favicon from './images/favicon.ico';
import './styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import {Input} from 'antd';
import Root from './routes/Root';

/**
 * 这里是测试注释
 */
render(
    <Root />,
    document.getElementById('app')
);