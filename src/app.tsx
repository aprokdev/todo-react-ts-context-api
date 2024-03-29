import * as React from 'react';
import ClearLocalStorage from '@components/clear-local-storage';
import CreateTodo from '@components/create-todo';
import HideChecked from '@components/hide-checked';
import Sorting from '@components/sorting';
import TodosList from '@components/todos-list';
import { useTodos } from '@todo-context/index';
import icon from '@img/icon.svg';
import './app.scss';

function App() {
    const { state, dispatch, isCompletedHidden, setHideCompleted } = useTodos();
    const { listTodos, sortingTitle, isSavedTodos } = state;

    const isCheckedTodos = React.useMemo(() => {
        return (
            Array.isArray(listTodos) &&
            listTodos.length > 0 &&
            listTodos.find(({ isCompleted }) => isCompleted)
        );
    }, [listTodos]);

    return (
        <div className="app">
            <div className="app__head">
                <h1 className="app__title">Todo List</h1>
                <a
                    href="https://www.typescriptlang.org/"
                    className="app__link"
                    target="__blank"
                    rel="noreferer noopener"
                >
                    <img src={icon} alt="" className="app__head-img" />
                </a>
            </div>
            <CreateTodo dispatch={dispatch} />
            {listTodos.length > 0 && <Sorting sortingTitle={sortingTitle} dispatch={dispatch} />}
            <TodosList
                listTodos={listTodos}
                dispatch={dispatch}
                isCompletedHidden={isCompletedHidden}
                setHideCompleted={setHideCompleted}
            />
            <div className="app__bottom">
                {Array.isArray(listTodos) && listTodos.length > 0 && (
                    <HideChecked
                        disabled={!isCheckedTodos}
                        isCompletedHidden={isCompletedHidden}
                        setHideCompleted={setHideCompleted}
                    />
                )}
                <ClearLocalStorage dispatch={dispatch} isSavedTodos={isSavedTodos} />
            </div>
        </div>
    );
}

export default App;
