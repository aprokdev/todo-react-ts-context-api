import { IAction } from '@src/todo-context/types';

export interface ISortingProps {
    sortingTitle: string;
    dispatch: React.Dispatch<IAction>;
}
