import { IAction, ITodo } from '@src/todo-context/types';

export interface ITodoProps {
    todo: ITodo;
    dispatch: React.Dispatch<IAction>;
    testId: string;
}
