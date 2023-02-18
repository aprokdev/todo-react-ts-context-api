/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import Button from '~ui/button';
import Input from '~ui/input';
import { actionTypes } from '~todo-context/actionTypes';
import './style.scss';
import { ICreateTodoProps } from './types';

function CreateTodo({ dispatch }: ICreateTodoProps) {
    const [text, updateText] = React.useState<string>('');

    const createTodo = React.useCallback(
        (event: React.MouseEvent<HTMLInputElement>) => {
            event.preventDefault();
            if (text) dispatch({ type: actionTypes.ADD_TODO, text });
            updateText('');
        },
        [text, dispatch]
    );

    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            updateText(event.target.value);
        },
        [updateText]
    );

    return (
        <form className="create-todo">
            <Input
                placeholder="Write new task here..."
                value={text}
                onChange={onChange}
                id="new-todo-input"
                testId="todo-input"
            />
            <Button type="submit" onClick={createTodo} disabled={!text} testId="todo-create-btn">
                Add
            </Button>
        </form>
    );
}

export default CreateTodo;
// export default React.memo(CreateTodo);
