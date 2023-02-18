/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { ITodo } from '~src/todo-context/types';
import TodoItem from '~components/todo-item/index';
import './style.scss';
import { ITodosListProps } from './types';

function TodosList({
    listTodos,
    dispatch,
    isCompletedHidden,
    setHideCompleted,
}: ITodosListProps): JSX.Element {
    return (
        <React.Fragment>
            {!isCompletedHidden &&
                Array.isArray(listTodos) &&
                listTodos.map((todo: ITodo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            dispatch={dispatch}
                            testId={String(todo.id)}
                        />
                    );
                })}
            {isCompletedHidden &&
                Array.isArray(listTodos) &&
                listTodos
                    .filter(({ isCompleted }: { isCompleted: boolean }) => !isCompleted)
                    .map((todo: ITodo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                dispatch={dispatch}
                                testId={String(todo.id)}
                            />
                        );
                    })}
        </React.Fragment>
    );
}

export default TodosList;
// export default React.memo(TodosList);
