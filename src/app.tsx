import * as React from 'react';
import CreateTodo from '~components/create-todo';
import TodosList from '~components/todos-list';
import { TodoProvider } from '~todo-context/index';
import './app.scss';

function App() {
    return (
        <div className="app">
            <TodoProvider>
                <h1 className="app__title">Todo List</h1>
                <CreateTodo />
                <TodosList />
            </TodoProvider>
        </div>
    );
}

export default App;
