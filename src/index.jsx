import './css/main.scss';
import favicon from './images/favicon.ico';
import React from 'react';
import { render } from 'react-dom';
import Root from './routes/Root';

render(
    <Root />,
    document.getElementById('app')
);