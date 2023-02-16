import { Todo } from './index';

export interface ITodoState {
    listTodos: Todo[];
    sortingTitle: string;
}

export interface IAction {
    type: string;
}
