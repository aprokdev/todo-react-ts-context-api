import React from 'react';
import ReactDOM from 'react-dom';
import { TodoProvider } from '~todo-context/index';
import App from './app';
import './index.scss';

const root = (
    <React.StrictMode>
        <TodoProvider>
            <App />
        </TodoProvider>
    </React.StrictMode>
);

ReactDOM.render(root, document.getElementById('root') as HTMLElement);
