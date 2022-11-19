import React from 'react';

type Todo = {
    id: string;
    label: string;
    isCompleted: boolean;
    created: number;
};

interface ITodoContext {
    list: Todo[];
    addTodo: (text: string) => void;
    onChangeTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteTodo: (id: string) => void;
    onEditTodo: (text: string, id: string) => void;
    isCompletedHidden: boolean;
    setHideCompleted: (val: boolean) => void;
    sorting: string;
    updateSorting: (val: string) => void;
}

export const sortState = {
    BY_DATE: 'BY_CREATION_DATE',
    ALPHABET: 'FROM_A_TO_Z',
    ALPHABET_REVERSE: 'FROM_Z_TO_A',
};

export const TodoContext = React.createContext<ITodoContext>({
    list: [],
    addTodo: () => undefined,
    onChangeTodo: () => undefined,
    onDeleteTodo: () => undefined,
    onEditTodo: () => undefined,
    isCompletedHidden: false,
    setHideCompleted: () => undefined,
    sorting: sortState.BY_DATE,
    updateSorting: () => undefined,
});

TodoContext.displayName = 'TodoContext';

export function useTodos() {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error(`useTodos must be used within a TodoProvider`);
    }
    return context;
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const localState = JSON.parse(localStorage.getItem('todo-list') || '[]');
    const [list, updateList] = React.useState<Todo[]>(localState);
    const [isCompletedHidden, setHideCompleted] = React.useState<boolean>(false);
    // const [leaveOnlyChecked, setLeaveOnlyChecked] =
    //     React.useState<boolean>(false);

    // const localHeaderClickCounter = +JSON.parse(
    //     localStorage.getItem('headerClickedCounter') || '0'
    // );
    // const [headerClickedTimes, countClickHeader] = React.useState<number>(
    //     localHeaderClickCounter
    // );

    // const clickHeaderTimesRef = React.useRef(0);

    const localSorting = JSON.parse(localStorage.getItem('sorting')) || `${sortState.BY_DATE}`;
    const [sorting, updateSorting] = React.useState<string>(localSorting);
    const sortingRef = React.useRef<string>(sortState.BY_DATE);

    React.useEffect(() => {
        if (sorting === sortState.BY_DATE && sortingRef.current !== sortState.BY_DATE) {
            updateList(
                [...list].sort((a, b) => {
                    if (a.created < b.created) {
                        return -1;
                    }
                    return 1;
                })
            );
            sortingRef.current = sortState.BY_DATE;
        }

        if (sorting === sortState.ALPHABET && sortingRef.current !== sortState.ALPHABET) {
            updateList(
                [...list].sort((a, b) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    return 1;
                })
            );
            sortingRef.current = sortState.ALPHABET;
        }

        if (sorting === sortState.ALPHABET_REVERSE && sortingRef.current !== sortState.ALPHABET_REVERSE) {
            updateList(
                [...list]
                    .sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        return 1;
                    })
                    .reverse()
            );
            sortingRef.current = sortState.ALPHABET_REVERSE;
        }
    }, [sorting, list]);

    const addTodo = React.useCallback(
        (text: string) => {
            const updatedList = [...list];
            updatedList.push({
                id: `${text}${+new Date()}`,
                label: text,
                isCompleted: false,
                created: new Date().getTime(),
            });
            updateList(updatedList);
        },
        [list, updateList]
    );

    const onChangeTodo = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const updatedList = list.map((item) => {
                if (e.target.id === item.id) {
                    return { ...item, isCompleted: e.target.checked };
                }
                return item;
            });
            updateList(updatedList);
        },
        [list, updateList]
    );

    const onDeleteTodo = React.useCallback(
        (id: string) => {
            const arr = [...list];
            const index = arr.findIndex((item) => id === item.id);
            arr.splice(index, 1);
            updateList(arr);
        },
        [list, updateList]
    );

    const onEditTodo = React.useCallback(
        (text: string, id: string) => {
            const updatedList = list.map((item) => {
                if (id === item.id) {
                    return { ...item, label: text };
                }
                return item;
            });
            updateList(updatedList);
        },
        [list, updateList]
    );

    React.useEffect(() => {
        const val = list.length ? list : null;
        localStorage.setItem('todo-list', JSON.stringify(val));
    }, [list]);

    React.useEffect(() => {
        localStorage.setItem('sorting', JSON.stringify(sorting));
    }, [sorting]);

    const value = React.useMemo(
        () => ({
            list,
            addTodo,
            onChangeTodo,
            onDeleteTodo,
            onEditTodo,
            isCompletedHidden,
            setHideCompleted,
            sorting,
            updateSorting,
        }),
        [
            list,
            addTodo,
            onChangeTodo,
            onDeleteTodo,
            onEditTodo,
            isCompletedHidden,
            setHideCompleted,
            sorting,
            updateSorting,
        ]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

const def = {
    TodoContext,
    TodoProvider,
};

export default def;
