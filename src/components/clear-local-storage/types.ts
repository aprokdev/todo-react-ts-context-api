import { IAction } from '@src/todo-context/types';

export interface IClearLSProps {
    isSavedTodos: boolean;
    dispatch: React.Dispatch<IAction>;
}
