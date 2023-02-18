import { actionTypes } from './actionTypes';
import { IAction, ITodoState } from './types';

function findTodoIndex(state: ITodoState, id: number | string): number | undefined {
    return state.listTodos.findIndex((todo) => todo.id === id);
}

export const sortingText = {
    CREATION_DATE: 'CREATION DATE',
    ALPHABET: 'ALPHABET',
    ALPHABET_REVERSE: 'ALPHABET-REVERSE',
};

function todosReducer(state: ITodoState, action: IAction): ITodoState {
    const newTodos = [...state.listTodos];
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return {
                ...state,
                listTodos: [
                    ...state.listTodos,
                    {
                        id: String(Number(new Date())),
                        label: action.text.trim(),
                        isCompleted: false,
                        created: Number(new Date()),
                    },
                ],
            };

        case actionTypes.CHECK_TODO:
            return {
                ...state,
                listTodos: state.listTodos.map((todo) => {
                    if (action.id === todo.id) {
                        return {
                            ...todo,
                            isCompleted: action.checked,
                        };
                    }
                    return todo;
                }),
            };

        case actionTypes.DELETE_TODO:
            newTodos.splice(findTodoIndex(state, action.id), 1);
            return {
                ...state,
                listTodos: newTodos,
            };

        case actionTypes.EDIT_TODO:
            newTodos.splice(findTodoIndex(state, action.id), 1, {
                ...state.listTodos[findTodoIndex(state, action.id)],
                label: action.text,
            });
            return {
                ...state,
                listTodos: newTodos,
            };

        case actionTypes.SORT_BY_DATE:
            return {
                listTodos: [...state.listTodos].sort((a, b) => {
                    if (a.created < b.created) {
                        return -1;
                    }
                    return 1;
                }),
                sortingTitle: sortingText.CREATION_DATE,
            };

        case actionTypes.SORT_BY_ALPHABET:
            return {
                listTodos: [...state.listTodos].sort((a, b) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    return 1;
                }),
                sortingTitle: sortingText.ALPHABET,
            };

        case actionTypes.SORT_BY_ALPHABET_REVERSE:
            return {
                listTodos: [...state.listTodos]
                    .sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        return 1;
                    })
                    .reverse(),
                sortingTitle: sortingText.ALPHABET_REVERSE,
            };

        default:
            return state;
    }
}

export { todosReducer };
