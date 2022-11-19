import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.scss';

const root = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

ReactDOM.render(root, document.getElementById('root') as HTMLElement);
