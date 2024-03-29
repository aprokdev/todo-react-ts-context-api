export interface ITodo {
    id: string;
    label: string;
    isCompleted: boolean;
    created: number;
}

export interface ITodoState {
    listTodos: ITodo[];
    isSavedTodos: boolean;
    sortingTitle: string;
}

export interface IAction {
    type: string;
    text?: string;
    checked?: boolean;
    id?: string | number;
}
