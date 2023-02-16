import * as React from 'react';
import CreateTodo from '~components/create-todo';
import HideChecked from '~components/hide-checked';
import Sorting from '~components/sorting';
import TodosList from '~components/todos-list';
import { useTodos } from '~todo-context/index';
import './app.scss';

function App() {
    const {
        list,
        addTodo,
        onChangeTodo,
        onDeleteTodo,
        onEditTodo,
        isCompletedHidden,
        setHideCompleted,
        sorting,
        updateSorting,
    } = useTodos();
    return (
        <div className="app">
            <h1 className="app__title">Todo List</h1>
            <CreateTodo />
            {list.length > 0 && <Sorting sorting={sorting} updateSorting={updateSorting} />}
            <TodosList />
            {Array.isArray(list) &&
                list.length > 0 &&
                list.find(({ isCompleted }) => isCompleted) && (
                    <HideChecked
                        isCompletedHidden={isCompletedHidden}
                        setHideCompleted={setHideCompleted}
                    />
                )}
        </div>
    );
}

export default App;
