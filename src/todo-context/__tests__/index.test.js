import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, create } from 'react-test-renderer';
import App from '../../app';
import { TodoProvider } from '../index';
import { sortingText } from '../reducer';

const localStorageMock = (function () {
    let store = {};

    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        removeItem: function (key) {
            delete store[key];
        },
        clear: function () {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

function Test() {
    return (
        <TodoProvider>
            <App />
        </TodoProvider>
    );
}

beforeEach(localStorage.clear); // clean LS after every cleanup

describe('Todo Functionality', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<Test />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('checks todos header visiability', async () => {
        const user = userEvent.setup();
        render(<Test />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText(/tasks/i)).toBeNull();
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        expect(screen.queryByText(/tasks/i)).toBeInTheDocument();
    });

    test('creates todo item', async () => {
        const user = userEvent.setup();
        render(<Test />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText('Test todo')).toBeNull();
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        expect(screen.queryByText('Test todo')).toBeInTheDocument();
        await user.type(todoInput, 'Test todo number two!');
        await user.click(addTodoBtn);
        expect(screen.queryByText('Test todo number two!')).toBeInTheDocument();
    });

    test('check todo works properly', async () => {
        const user = userEvent.setup();
        render(<Test />);
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
        render(<Test />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        const editBtn = screen.getByText(/edit/i);
        await user.click(editBtn);
        const editField = screen.getByTestId('Test todo-edit-field');
        await user.type(editField, ' edited');
        expect(editField.value).toBe('Test todo edited');
        editField.blur();
    });

    test('deleting todo works properly', async () => {
        const user = userEvent.setup();
        render(<Test />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        expect(screen.queryByText('Test todo')).toBeNull();
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        expect(screen.queryByText('Test todo')).toBeInTheDocument();
        const deleteBtn = screen.getByText(/delete/i);
        await user.click(deleteBtn);
        expect(screen.queryByText('Test todo')).toBeNull();
    });

    test('"Hide completed" should hide checked todos', async () => {
        const user = userEvent.setup();
        render(<Test />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        // add todo 1
        expect(screen.queryByText('Test todo')).toBeNull();
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        expect(screen.queryByText('Test todo')).toBeInTheDocument();
        // add todo 2
        expect(screen.queryByText('Test todo number two')).toBeNull();
        await user.type(todoInput, 'Test todo number two');
        await user.click(addTodoBtn);
        expect(screen.queryByText('Test todo number two')).toBeInTheDocument();
        // check todo 2
        const label = screen.getByText('Test todo number two');
        const checkbox = screen.getByTestId('Test todo number two-cb-input');
        expect(checkbox).not.toBeChecked();
        await user.click(label);
        expect(checkbox).toBeChecked();

        const filterLabel = screen.queryByText('Hide completed');
        expect(filterLabel).not.toBeChecked();
        // hide checked todos
        await user.click(filterLabel);

        expect(screen.queryByText('Test todo')).toBeInTheDocument();
        expect(screen.queryByText('Test todo number two')).toBeNull();
    });

    test('sorting works properly', async () => {
        const user = userEvent.setup();
        render(<Test />);
        const todoInput = screen.getByTestId('todo-input');
        const addTodoBtn = screen.getByTestId('todo-create-btn');
        // add todo 1
        expect(screen.queryByText('Test todo')).toBeNull();
        await user.type(todoInput, 'Test todo');
        await user.click(addTodoBtn);
        expect(screen.queryByText('Test todo')).toBeInTheDocument();
        expect(screen.queryByText(/tasks/i)).toBeInTheDocument();
        // add todo 2
        expect(screen.queryByText('CTest todo number two')).toBeNull();
        await user.type(todoInput, 'CTest todo number two');
        await user.click(addTodoBtn);
        expect(screen.queryByText('CTest todo number two')).toBeInTheDocument();
        // add todo 3
        expect(screen.queryByText('ATest todo number three')).toBeNull();
        await user.type(todoInput, 'ATest todo number three');
        await user.click(addTodoBtn);
        expect(screen.queryByText('ATest todo number three')).toBeInTheDocument();
        // add todo 4
        expect(screen.queryByText('BTest todo number four')).toBeNull();
        await user.type(todoInput, 'BTest todo number four');
        await user.click(addTodoBtn);
        expect(screen.queryByText('BTest todo number four')).toBeInTheDocument();
        // add todo 5
        expect(screen.queryByText('321123')).toBeNull();
        await user.type(todoInput, '321123');
        await user.click(addTodoBtn);
        expect(screen.queryByText('321123')).toBeInTheDocument();

        const header = screen.queryByText(/Sort tasks by: CREATION DATE/i);
        const regExpToGet =
            /Test todo|CTest todo number two|ATest todo number three|BTest todo number four|321123/;

        // after first click on header sorts from A to Z:
        await user.click(header);
        expect(header.innerHTML).toBe('✨ Sort tasks by: ALPHABET');
        // checking saving sorting in LocalStorage:
        expect(JSON.parse(localStorage.getItem('sortingTitle'))).toBe(sortingText.ALPHABET);

        const alphabetSortedExpected = [
            '321123',
            'ATest todo number three',
            'BTest todo number four',
            'CTest todo number two',
            'Test todo',
        ];
        const alphabelSortedLabels = screen
            .queryAllByText(regExpToGet)
            .map((label) => label.innerHTML);
        expect(alphabelSortedLabels).toEqual(alphabetSortedExpected);

        // after second click on header sorts from Z to A:
        await user.click(header);
        expect(header.innerHTML).toBe('✨ Sort tasks by: ALPHABET-REVERSE');
        // checking saving sorting in LocalStorage:
        expect(JSON.parse(localStorage.getItem('sortingTitle'))).toBe(sortingText.ALPHABET_REVERSE);

        const alphabetReverseSortedExpected = [
            'Test todo',
            'CTest todo number two',
            'BTest todo number four',
            'ATest todo number three',
            '321123',
        ];
        const alphabeReverselSortedLabels = screen
            .queryAllByText(regExpToGet)
            .map((label) => label.innerHTML);
        expect(alphabeReverselSortedLabels).toEqual(alphabetReverseSortedExpected);

        // after third click on header sorts by creation time:
        await user.click(header);
        expect(header.innerHTML).toBe('✨ Sort tasks by: CREATION DATE');
        // checking saving sorting in LocalStorage:
        expect(JSON.parse(localStorage.getItem('sortingTitle'))).toBe(sortingText.CREATION_DATE);

        const byDateSortedExpected = [
            'Test todo',
            'CTest todo number two',
            'ATest todo number three',
            'BTest todo number four',
            '321123',
        ];
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
        render(<Test />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual([]);
    });

    test('list is sorted by creation date in case if list exist in storage and sorted by creation date', async () => {
        localStorage.setItem('listTodos', JSON.stringify(todoListCreationDate));
        localStorage.setItem('sortingTitle', JSON.stringify(sortingText.CREATION_DATE));
        render(<Test />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual(orderByCreationDate);
    });

    test('list sorted by alphabet if in storage is list sorted by alphabet', async () => {
        localStorage.setItem('listTodos', JSON.stringify(todoListAlphabet));
        localStorage.setItem('sortingTitle', JSON.stringify(sortingText.ALPHABET));
        render(<Test />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual(orderByAlphabet);
    });

    test('list sorted by alphabet if in storage is list sorted by alphabet reverse', async () => {
        localStorage.setItem('listTodos', JSON.stringify(todoListAlphabetReverse));
        localStorage.setItem('sortingTitle', JSON.stringify(sortingText.ALPHABET_REVERSE));
        render(<Test />);
        const orderedLabels = screen.queryAllByText(regExpToGet).map((label) => label.innerHTML);
        expect(orderedLabels).toEqual(orderByReverseAlphabet);
    });
});
