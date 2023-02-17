import { ChangeEvent } from 'react';
import { IAction, ITodo } from '~src/todo-context/types';

export interface ITodoData {
    id: string;
    label: string;
    isCompleted: boolean;
    created: number;
}
export interface ITodoItem {
    onChangeTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteTodo: (id: string) => void;
    onEditTodo: (text: string, id: string) => void;
    data: ITodoData;
}

export interface ITodoProps {
    todo: ITodo;
    dispatch: React.Dispatch<IAction>;
    testId: string;
}
