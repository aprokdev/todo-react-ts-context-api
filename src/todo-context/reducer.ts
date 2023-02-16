import { Map } from 'immutable';
import { actionTypes } from './actionTypes';
import { ITodoState } from './types';

function findIndex(state: ITodoState, id: number | string) {
    return state.findIndex((data) => String(id) === String(data.get('id')));
}

export const sortingText = {
    CREATION_DATE: 'CREATION DATE',
    ALPHABET: 'ALPHABET',
    ALPHABET_REVERSE: 'ALPHABET-REVERSE',
};

function todosReducer(state: ITodoState, action) {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return state.update('listTodos', (listTodos) =>
                listTodos.push(
                    Map({
                        id: Number(new Date()),
                        label: action.text.trim(),
                        isCompleted: false,
                        created: Number(new Date()),
                    })
                )
            );

        case actionTypes.CHECK_TODO:
            return state.update('listTodos', (listTodos) =>
                listTodos.update(findIndex(listTodos, action.id), (data) =>
                    data.set('isCompleted', action.checked)
                )
            );

        case actionTypes.DELETE_TODO:
            return state.update('listTodos', (listTodos) =>
                listTodos.delete(findIndex(listTodos, action.id))
            );

        case actionTypes.EDIT_TODO:
            return state.update('listTodos', (listTodos) =>
                listTodos.update(findIndex(listTodos, action.id), (todo) =>
                    todo.set('label', action.text)
                )
            );

        case actionTypes.SORT_BY_DATE:
            return state
                .update('listTodos', (listTodos) =>
                    listTodos.sort((a, b) => {
                        if (a.get('created') < b.get('created')) {
                            return -1;
                        }
                        return 1;
                    })
                )
                .update('sortingTitle', () => sortingText.CREATION_DATE);

        case actionTypes.SORT_BY_ALPHABET:
            return state
                .update('listTodos', (listTodos) =>
                    listTodos.sort((a, b) => {
                        if (a.get('label') < b.get('label')) {
                            return -1;
                        }
                        return 1;
                    })
                )
                .update('sortingTitle', () => sortingText.ALPHABET);

        case actionTypes.SORT_BY_ALPHABET_REVERSE:
            return state
                .update('listTodos', (listTodos) =>
                    listTodos
                        .sort((a, b) => {
                            if (a.get('label') < b.get('label')) {
                                return -1;
                            }
                            return 1;
                        })
                        .reverse()
                )
                .update('sortingTitle', () => sortingText.ALPHABET_REVERSE);

        default:
            return state;
    }
}

export { todosReducer };
