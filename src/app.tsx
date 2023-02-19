import * as React from 'react';
import CreateTodo from '~components/create-todo';
import HideChecked from '~components/hide-checked';
import Sorting from '~components/sorting';
import TodosList from '~components/todos-list';
import { useTodos } from '~todo-context/index';
import icon from '~img/icon.svg';
import './app.scss';

function App() {
    const { state, dispatch, isCompletedHidden, setHideCompleted } = useTodos();
    const { listTodos, sortingTitle } = state;
    return (
        <div className="app">
            <div className="app__head">
                <h1 className="app__title">Todo List</h1>
                <img src={icon} alt="" className="app__head-img" />
            </div>
            <CreateTodo dispatch={dispatch} />
            {listTodos.length > 0 && <Sorting sortingTitle={sortingTitle} dispatch={dispatch} />}
            <TodosList
                listTodos={listTodos}
                dispatch={dispatch}
                isCompletedHidden={isCompletedHidden}
                setHideCompleted={setHideCompleted}
            />
            {Array.isArray(listTodos) &&
                listTodos.length > 0 &&
                listTodos.find(({ isCompleted }) => isCompleted) && (
                    <HideChecked
                        isCompletedHidden={isCompletedHidden}
                        setHideCompleted={setHideCompleted}
                    />
                )}
        </div>
    );
}

export default App;
