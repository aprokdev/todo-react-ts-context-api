import React, { Reducer } from 'react';
import { todosReducer } from './reducer';
import { sortingText } from './reducer';
import { IAction, ITodoState } from './types';

export interface ITodoContext {
    state: ITodoState;
    dispatch: React.Dispatch<IAction>;
    isCompletedHidden: boolean;
    setHideCompleted: (val: boolean) => void;
}

export const TodoContext = React.createContext<ITodoContext>({
    state: {
        listTodos: [],
        sortingTitle: '',
    },
    dispatch: () => undefined,
    isCompletedHidden: true,
    setHideCompleted: () => null,
});

TodoContext.displayName = 'TodoContext';

export function useTodos() {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error(`useTodos must be used within a TodoProvider`);
    }
    return context;
}

// const localState = JSON.parse(localStorage.getItem('todo-state'));
// const localTodos = localState ? localState.listTodos : [];
// const localSorting = localState ? localState.sortingTitle : sortingText.CREATION_DATE;

// const initialState = Map({
//     listTodos: List(localTodos.map((todo) => Map(todo))),
//     sortingTitle: localSorting,
// });

export function TodoProvider({ children }: { children: React.ReactNode }) {
    // this ugly initialState should be as it is to make tests work properly
    const [state, dispatch] = React.useReducer<Reducer<ITodoState, IAction>>(todosReducer, {
        listTodos: JSON.parse(localStorage.getItem('listTodos')) || [],
        sortingTitle: JSON.parse(localStorage.getItem('sortingTitle')) || sortingText.CREATION_DATE,
    });
    const [isCompletedHidden, setHideCompleted] = React.useState(false);

    // saving every edit in localStorage:
    React.useEffect(() => {
        localStorage.setItem('listTodos', JSON.stringify(state.listTodos));
        localStorage.setItem('sortingTitle', JSON.stringify(state.sortingTitle));
    }, [state]);

    const value = React.useMemo(
        () => ({
            state,
            dispatch,
            isCompletedHidden,
            setHideCompleted,
        }),
        [state, dispatch, isCompletedHidden, setHideCompleted]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
