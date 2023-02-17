export interface ITodo {
    id: number;
    label: string;
    isCompleted: boolean;
    created: number;
}

export interface ITodoState {
    listTodos: ITodo[];
    sortingTitle: string;
}

export interface IAction {
    type: string;
    text?: string;
    checked?: boolean;
    id?: string | number;
}