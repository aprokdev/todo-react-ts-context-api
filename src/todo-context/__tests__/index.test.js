import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, create } from 'react-test-renderer';
import { TodoProvider } from '@todo-context/index';
import App from '../../app';
import { sortingText } from '../reducer';
import { renderWithTodoProvider } from '../test-utils';

afterEach(localStorage.clear); // clean LS after every cleanup

describe('Todo Functionality', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(
                <TodoProvider>
                    <App />
                </TodoProvider>
            );
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('checks todos header visiability', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(/tasks/i)).toBeNull();
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        expect(screen.queryByText(/tasks/i)).toBeInTheDocument();
    });

    test('creates todo item', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const test1 = 'Test todo';
        const test2 = 'Test todo number two!';
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(test1)).toBeNull();
        await user.type(todoInput, test1);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test1)).toBeInTheDocument();
        expect(screen.queryByText(test2)).toBeNull();
        await user.type(todoInput, test2);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test2)).toBeInTheDocument();
    });

    test('checks if input still focused after creating todo', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const test1 = 'Test todo';
        const test2 = 'Test todo number two!';
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(test1)).toBeNull();
        await user.type(todoInput, test1);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test1)).toBeInTheDocument();
        expect(todoInput).toHaveFocus();

        expect(screen.queryByText(test2)).toBeNull();
        await user.type(todoInput, test2);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test2)).toBeInTheDocument();
        expect(todoInput).toHaveFocus();
    });

    test('check todo works properly', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        const label = screen.getByTestId('Test todo-label');
        const checkbox = screen.getByTestId('Test todo-cb-input');
        expect(checkbox).not.toBeChecked();
        await user.click(label);
        expect(checkbox).toBeChecked();
        await user.click(screen.getByTestId('Test todo-cb-square'));
        expect(checkbox).not.toBeChecked();
    });

    test('todo is editable', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const test = 'Test todo';
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        await user.type(todoInput, test);
        await user.click(addTodoBtn);
        const editBtn = screen.getByText(/edit/i);
        await user.click(editBtn);
        const editField = screen.getByTestId('Test todo-edit-field');
        await user.type(editField, ' edited');
        expect(editField.value).toBe(`${test} edited`);
        editField.blur();
    });

    test('deleting todo works properly', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const test = 'Test todo';
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(test)).toBeNull();
        await user.type(todoInput, test);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test)).toBeInTheDocument();
        const deleteBtn = screen.getByText(/delete/i);
        await user.click(deleteBtn);
        expect(screen.queryByText(test)).toBeNull();
    });

    test('"Hide completed" should hide checked todos', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        // add todo 1
        const test1 = 'Test todo';
        expect(screen.queryByText(test1)).toBeNull();
        await user.type(todoInput, test1);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test1)).toBeInTheDocument();
        // add todo 2
        const test2 = 'Test todo number two';
        expect(screen.queryByText(test2)).toBeNull();
        await user.type(todoInput, test2);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test2)).toBeInTheDocument();
        // check todo 2
        const label = screen.getByText(test2);
        const checkbox = screen.getByTestId('Test todo number two-cb-input');
        expect(checkbox).not.toBeChecked();
        await user.click(label);
        expect(checkbox).toBeChecked();

        const filterLabel = screen.queryByText('Hide completed');
        expect(filterLabel).not.toBeChecked();
        // hide checked todos
        await user.click(filterLabel);

        expect(screen.queryByText(test1)).toBeInTheDocument();
        expect(screen.queryByText(test2)).toBeNull();
    });

    test('sorting works properly', async () => {
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        // add todo 1
        const test1 = 'Test todo';
        expect(screen.queryByText(test1)).toBeNull();
        await user.type(todoInput, test1);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test1)).toBeInTheDocument();
        expect(screen.queryByText(/tasks/i)).toBeInTheDocument();
        // add todo 2
        const test2 = 'CTest todo number two';
        expect(screen.queryByText(test2)).toBeNull();
        await user.type(todoInput, test2);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test2)).toBeInTheDocument();
        // add todo 3
        const test3 = 'ATest todo number three';
        expect(screen.queryByText(test3)).toBeNull();
        await user.type(todoInput, test3);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test3)).toBeInTheDocument();
        // add todo 4
        const test4 = 'BTest todo number four';
        expect(screen.queryByText(test4)).toBeNull();
        await user.type(todoInput, test4);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test4)).toBeInTheDocument();
        // add todo 5
        const test5 = '321123';
        expect(screen.queryByText(test5)).toBeNull();
        await user.type(todoInput, test5);
        await user.click(addTodoBtn);
        expect(screen.queryByText(test5)).toBeInTheDocument();

        const header = screen.queryByText(/Sort tasks by: CREATION DATE/i);
        const regExpToGet = new RegExp(`${test1}|${test2}|${test3}|${test4}|${test5}`);

        // after first click on header sorts from A to Z:
        await user.click(header);
        expect(header.innerHTML).toBe('✨ Sort tasks by: ALPHABET');
        // checking saving sorting in LocalStorage:
        expect(JSON.parse(localStorage.getItem('sortingTitle'))).toBe(sortingText.ALPHABET);

        const alphabetSortedExpected = [test5, test3, test4, test2, test1];
        const alphabelSortedLabels = screen
            .queryAllByText(regExpToGet)
            .map((label) => label.innerHTML);
        expect(alphabelSortedLabels).toEqual(alphabetSortedExpected);

        // after second click on header sorts from Z to A:
        await user.click(header);
        expect(header.innerHTML).toBe('✨ Sort tasks by: ALPHABET-REVERSE');
        // checking saving sorting in LocalStorage:
        expect(JSON.parse(localStorage.getItem('sortingTitle'))).toBe(sortingText.ALPHABET_REVERSE);

        const alphabetReverseSortedExpected = [test1, test2, test4, test3, test5];
        const alphabeReverselSortedLabels = screen
            .queryAllByText(regExpToGet)
            .map((label) => label.innerHTML);
        expect(alphabeReverselSortedLabels).toEqual(alphabetReverseSortedExpected);

        // after third click on header sorts by creation time:
        await user.click(header);
        expect(header.innerHTML).toBe('✨ Sort tasks by: CREATION DATE');
        // checking saving sorting in LocalStorage:
        expect(JSON.parse(localStorage.getItem('sortingTitle'))).toBe(sortingText.CREATION_DATE);

        const byDateSortedExpected = [test1, test2, test3, test4, test5];
        const byDateSortedLabels = screen
            .queryAllByText(regExpToGet)
            .map((label) => label.innerHTML);
        expect(byDateSortedLabels).toEqual(byDateSortedExpected);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const localTodos = [
    {
        id: 'asds dsaddbsaddft1660138005899',
        label: 'asds dsaddbsaddft',
        isCompleted: true,
        created: 1660138005899,
    },
    {
        id: 'pouipiuoiuou1660138010767',
        label: 'pouipiuoiuou',
        isCompleted: true,
        created: 1660138010767,
    },
    {
        id: 'werewrewr1660138025187',
        label: 'werewrewr',
        isCompleted: false,
        created: 1660138025187,
    },
    {
        id: 'amfdfd1660138034979',
        label: 'dfgfdamfdfd',
        isCompleted: true,
        created: 1660138034979,
    },
    {
        id: 'iidfigdfigdf1660138040124',
        label: 'iidfigdfigdf',
        isCompleted: true,
        created: 1660138040124,
    },
    {
        id: 'bfsdfdsfds1660138042611',
        label: 'bfsdfdsfds',
        isCompleted: false,
        created: 1660138042611,
    },
    {
        id: '12213fdgd1660140356843',
        label: '12213fdgd',
        isCompleted: false,
        created: 1660140356843,
    },
    {
        id: 'test text1660307378285',
        label: 'test text',
        isCompleted: false,
        created: 1660307378285,
    },
];

const todoListCreationDate = [...localTodos].sort((a, b) => {
    if (a.created < b.created) {
        return -1;
    }
    return 1;
});

const todoListAlphabet = [...localTodos].sort((a, b) => {
    if (a.label < b.label) {
        return -1;
    }
    return 1;
});

const todoListAlphabetReverse = [...localTodos]
    .sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        }
        return 1;
    })
    .reverse();

const orderByCreationDate = [
    'asds dsaddbsaddft',
    'pouipiuoiuou',
    'werewrewr',
    'dfgfdamfdfd',
    'iidfigdfigdf',
    'bfsdfdsfds',
    '12213fdgd',
    'test text',
];
const orderByAlphabet = [
    '12213fdgd',
    'asds dsaddbsaddft',
    'bfsdfdsfds',
    'dfgfdamfdfd',
    'iidfigdfigdf',
    'pouipiuoiuou',
    'test text',
    'werewrewr',
];
const orderByReverseAlphabet = [
    'werewrewr',
    'test text',
    'pouipiuoiuou',
    'iidfigdfigdf',
    'dfgfdamfdfd',
    'bfsdfdsfds',
    'asds dsaddbsaddft',
    '12213fdgd',
];

describe('Todo Functionalityworks with localStorage properly', () => {
    const regExpToGet =
        /asds dsaddbsaddft|pouipiuoiuou|werewrewr|dfgfdamfdfd|iidfigdfigdf|bfsdfdsfds|12213fdgd|test text/;

    test('empty list with clean storage', async () => {
        renderWithTodoProvider(<App />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual([]);
    });

    test('list is sorted by creation date in case if list exist in storage and sorted by creation date', async () => {
        localStorage.setItem('listTodos', JSON.stringify(todoListCreationDate));
        localStorage.setItem('sortingTitle', JSON.stringify(sortingText.CREATION_DATE));
        renderWithTodoProvider(<App />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual(orderByCreationDate);
    });

    test('list sorted by alphabet if in storage is list sorted by alphabet', async () => {
        localStorage.setItem('listTodos', JSON.stringify(todoListAlphabet));
        localStorage.setItem('sortingTitle', JSON.stringify(sortingText.ALPHABET));
        renderWithTodoProvider(<App />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual(orderByAlphabet);
    });

    test('list sorted by alphabet if in storage is list sorted by alphabet reverse', async () => {
        localStorage.setItem('listTodos', JSON.stringify(todoListAlphabetReverse));
        localStorage.setItem('sortingTitle', JSON.stringify(sortingText.ALPHABET_REVERSE));
        renderWithTodoProvider(<App />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual(orderByReverseAlphabet);
    });
});

describe('Clearing Local Storage works properly', () => {
    test('Clicking on clear-local-storage btn cleans LS and removes that btn from document', async () => {
        const firstTodoText = 'Test todo';
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);

        // add todo item
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(/tasks/i)).toBeNull();
        await user.type(todoInput, firstTodoText);
        await user.click(addTodoBtn);

        // check todo item is saved in LS and Clear LS btn is visible
        expect(localStorage.getItem('listTodos')).not.toBeNull();
        expect(localStorage.getItem('sortingTitle')).not.toBeNull();
        const clearLSBtn = screen.getByTestId('clear-local-storage');
        expect(clearLSBtn).toBeInTheDocument();

        // clear LS by clicking clearLSBtn
        await user.click(clearLSBtn);

        // check todo item is cleared from LS and Clear LS btn is not visible
        expect(localStorage.getItem('listTodos')).toBeNull();
        expect(localStorage.getItem('sortingTitle')).toBeNull();
        expect(screen.queryByText(/Clear Local Storage/i)).toBeNull();
    });

    test('Clicking on the checkbox label saves current todos state to LS and clear-local-storage btn is appearing', async () => {
        const firstTodoText = 'Test todo';
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);

        // add todo item
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(/tasks/i)).toBeNull();
        await user.type(todoInput, firstTodoText);
        await user.click(addTodoBtn);

        // check todo item is saved in LS and Clear LS btn is visible
        expect(localStorage.getItem('listTodos')).not.toBeNull();
        expect(localStorage.getItem('sortingTitle')).not.toBeNull();
        const clearLSBtn = screen.getByTestId('clear-local-storage');
        expect(clearLSBtn).toBeInTheDocument();

        // clear LS by clicking clearLSBtn
        await user.click(clearLSBtn);

        // check todo item is cleared from LS and Clear LS btn is not visible
        expect(localStorage.getItem('listTodos')).toBeNull();
        expect(localStorage.getItem('sortingTitle')).toBeNull();
        expect(screen.queryByText(/Clear Local Storage/i)).toBeNull();

        // click in todo's label to check it
        const label = screen.getByTestId('Test todo-label');
        const checkbox = screen.getByTestId('Test todo-cb-input');
        expect(checkbox).not.toBeChecked();
        await user.click(label);
        expect(checkbox).toBeChecked();

        // check if todo now saved in LS and ClearLS btn is visible
        expect(localStorage.getItem('listTodos')).not.toBeNull();
        expect(localStorage.getItem('sortingTitle')).not.toBeNull();
        expect(screen.getByTestId('clear-local-storage')).toBeInTheDocument();
    });

    test('Editing todos label saves current todos state to LS and clear-local-storage btn is appearing', async () => {
        const firstTodoText = 'Test todo';
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);

        // add todo item
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(/tasks/i)).toBeNull();
        await user.type(todoInput, firstTodoText);
        await user.click(addTodoBtn);

        // check todo item is saved in LS and Clear LS btn is visible
        expect(localStorage.getItem('listTodos')).not.toBeNull();
        expect(localStorage.getItem('sortingTitle')).not.toBeNull();
        const clearLSBtn = screen.getByTestId('clear-local-storage');
        expect(clearLSBtn).toBeInTheDocument();

        // clear LS by clicking clearLSBtn
        await user.click(clearLSBtn);

        // editing todo's label
        const editBtn = screen.getByText(/edit/i);
        await user.click(editBtn);
        const editField = screen.getByTestId('Test todo-edit-field');
        await user.type(editField, ' edited');
        expect(editField.value).toBe('Test todo edited');
        await user.tab(); // blur

        // check if todo now saved in LS and ClearLS btn is visible
        expect(localStorage.getItem('sortingTitle')).not.toBeNull();
        expect(localStorage.getItem('listTodos')).not.toBeNull();
        expect(screen.getByTestId('clear-local-storage')).toBeInTheDocument();
    });

    test('Deleting todos saves current todos state to LS and clear-local-storage btn is appearing', async () => {
        const firstTodoText = 'Test todo';
        const secondTodoText = 'Test todo number two';
        const user = userEvent.setup();
        renderWithTodoProvider(<App />);

        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        // add first todo item

        expect(screen.queryByText(/tasks/i)).toBeNull();
        await user.type(todoInput, firstTodoText);
        await user.click(addTodoBtn);
        expect(screen.queryByText(firstTodoText)).toBeInTheDocument();

        // add second todo item
        await user.type(todoInput, secondTodoText);
        await user.click(addTodoBtn);
        expect(screen.queryByText(secondTodoText)).toBeInTheDocument();

        // check todo item is saved in LS and Clear LS btn is visible
        expect(localStorage.getItem('listTodos')).not.toBeNull();
        expect(localStorage.getItem('sortingTitle')).not.toBeNull();
        const clearLSBtn = screen.getByTestId('clear-local-storage');
        expect(clearLSBtn).toBeInTheDocument();

        // clear LS by clicking clearLSBtn
        await user.click(clearLSBtn);

        // delete first todo
        const deleteBtn = screen.getByTestId(`${firstTodoText}-delete`);
        await user.click(deleteBtn);

        // check if todo now saved in LS and ClearLS btn is visible
        expect(localStorage.getItem('listTodos')).not.toBeNull();
        expect(localStorage.getItem('sortingTitle')).not.toBeNull();
        expect(screen.getByTestId('clear-local-storage')).toBeInTheDocument();
    });
});
