import { IAction, ITodo } from '~src/todo-context/types';

export interface ITodosListProps {
    listTodos: ITodo[];
    dispatch: React.Dispatch<IAction>;
    isCompletedHidden: boolean;
    setHideCompleted: (val: boolean) => void;
}
