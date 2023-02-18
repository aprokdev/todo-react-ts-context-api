import { sortingText } from '../../src/todo-context/reducer';

const page = 'http://localhost:3000/';
const todos = ['Todo number one', 'Todo number two', 'Todo number three'];
const typeDelay = 0;

describe('My First E2E Test', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.viewport(1366, 768);
        cy.visit(page);
    });

    it('checks todos header visiability', () => {
        cy.get('.sorting').should('not.exist');

        cy.contains(todos[0]).should('not.exist');

        cy.get('#new-todo-input')
            .type(todos[0], { delay: typeDelay })
            .should('have.value', todos[0]);
        cy.contains(/add/i).click();

        cy.contains(todos[0]).should('exist');
        cy.get('.todo-item').should('have.length', 1);

        cy.get('.sorting').should('exist');
    });

    it('creates todo items', () => {
        cy.get('.todo-item').should('not.exist');

        cy.get('#new-todo-input')
            .type(todos[0], { delay: typeDelay })
            .should('have.value', todos[0]);
        cy.contains(/add/i).click();

        cy.contains(todos[0]).should('exist');
        cy.get('.todo-item').should('have.length', 1);

        cy.get('#new-todo-input')
            .type(todos[1], { delay: typeDelay })
            .should('have.value', todos[1]);
        cy.contains(/add/i).click();

        cy.contains(todos[1]).should('exist');
        cy.get('.todo-item').should('have.length', 2);

        cy.get('#new-todo-input')
            .type(todos[2], { delay: typeDelay })
            .should('have.value', todos[2]);
        cy.contains(/add/i).click();

        cy.contains(todos[2]).should('exist');
        cy.get('.todo-item').should('have.length', 3);
    });

    it('check todo works properly', () => {
        cy.get('#new-todo-input')
            .type(todos[0], { delay: typeDelay })
            .should('have.value', todos[0]);
        cy.contains(/add/i).click();

        cy.contains(todos[0]).should('exist');
        cy.contains(todos[0]).parent().find('input[type=checkbox]').should('not.be.checked');
        cy.contains(todos[0]).click();
        cy.contains(todos[0]).parent().find('input[type=checkbox]').should('be.checked');
        cy.contains(todos[0]).parent().find('.checkbox__square').click();
        cy.contains(todos[0]).parent().find('input[type=checkbox]').should('not.be.checked');
    });

    it('todo is editable', () => {
        cy.get('#new-todo-input')
            .type(todos[0], { delay: typeDelay })
            .should('have.value', todos[0]);
        cy.contains(/add/i).click();

        cy.get('.todo-item .label').should('exist');
        cy.get('.todo-item .todo-item__input').should('not.exist');

        cy.contains(/edit/i).click();

        cy.get('.todo-item .label').should('not.exist');
        cy.get('.todo-item .todo-item__input').should('exist');

        cy.get('.todo-item .todo-item__input')
            .type(' edited', { delay: typeDelay })
            .should('have.value', `${todos[0]} edited`);

        cy.get('.todo-item .todo-item__input').blur();
    });

    it('deleting todo works properly', () => {
        cy.contains(todos[0]).should('not.exist');

        cy.get('#new-todo-input')
            .type(todos[0], { delay: typeDelay })
            .should('have.value', todos[0]);
        cy.contains(/add/i).click();

        cy.contains(todos[0]).should('exist');

        cy.contains(/delete/i).click();

        cy.contains(todos[0]).should('not.exist');
    });

    it('"Hide completed" should hide checked todos', () => {
        // add todo 1
        cy.contains(todos[0]).should('not.exist');
        cy.get('#new-todo-input')
            .type(todos[0], { delay: typeDelay })
            .should('have.value', todos[0]);
        cy.contains(/add/i).click();
        cy.contains(todos[0]).should('exist');

        // add todo 2
        cy.contains(todos[1]).should('not.exist');
        cy.get('#new-todo-input')
            .type(todos[1], { delay: typeDelay })
            .should('have.value', todos[1]);
        cy.contains(/add/i).click();
        cy.contains(todos[1]).should('exist');

        // check todo 2
        cy.contains(todos[1]).parent().find('input[type=checkbox]').should('not.be.checked');
        cy.contains(todos[1]).click();
        cy.contains(todos[1]).parent().find('input[type=checkbox]').should('be.checked');

        // check 'Hide completed'
        cy.contains(/hide completed/i)
            .parent()
            .find('input[type=checkbox]')
            .should('not.be.checked');
        cy.contains(/hide completed/i).click();
        cy.contains(/hide completed/i)
            .parent()
            .find('input[type=checkbox]')
            .should('be.checked');

        // checks if second todo has been hidden
        cy.contains(todos[0]).should('exist');
        cy.contains(todos[1]).should('not.exist');
    });

    it('sorting works properly', async () => {
        // add todo 1
        cy.contains('Test todo').should('not.exist');
        cy.get('#new-todo-input')
            .type('Test todo', { delay: typeDelay })
            .should('have.value', 'Test todo');
        cy.contains(/add/i).click();
        cy.contains('Test todo').should('exist');

        // add todo 2
        cy.contains('CTest todo number two').should('not.exist');
        cy.get('#new-todo-input')
            .type('CTest todo number two', { delay: typeDelay })
            .should('have.value', 'CTest todo number two');
        cy.contains(/add/i).click();
        cy.contains('CTest todo number two').should('exist');

        // add todo 3
        cy.contains('ATest todo number three').should('not.exist');
        cy.get('#new-todo-input')
            .type('ATest todo number three', { delay: typeDelay })
            .should('have.value', 'ATest todo number three');
        cy.contains(/add/i).click();
        cy.contains('ATest todo number three').should('exist');

        // add todo 4
        cy.contains('BTest todo number four').should('not.exist');
        cy.get('#new-todo-input')
            .type('BTest todo number four', { delay: typeDelay })
            .should('have.value', 'BTest todo number four');
        cy.contains(/add/i).click();
        cy.contains('BTest todo number four').should('exist');

        // add todo 5
        cy.contains('321123').should('not.exist');
        cy.get('#new-todo-input')
            .type('321123', { delay: typeDelay })
            .should('have.value', '321123');
        cy.contains(/add/i).click();
        cy.contains('321123').should('exist');

        const header = cy.get('.sorting');

        cy.get('.sorting').should('contain', 'Sort tasks by: CREATION DATE');
        cy.getLocalStorage('sortingTitle').should(
            'equal',
            JSON.stringify(sortingText.CREATION_DATE)
        );

        // after first click on header sorts from A to Z:
        header.click();
        cy.get('.sorting').should('contain', 'Sort tasks by: ALPHABET');

        // checking saving sorting in LocalStorage:
        cy.getLocalStorage('sortingTitle').should('equal', JSON.stringify(sortingText.ALPHABET));

        const alphabetSortedExpected = [
            '321123',
            'ATest todo number three',
            'BTest todo number four',
            'CTest todo number two',
            'Test todo',
        ];

        cy.get('.todo-item').then((list) => {
            const labelsList = [...list].map((todo) => todo.firstChild.children[1].innerHTML);
            cy.wrap(labelsList).should('eql', alphabetSortedExpected);
        });

        // after second click on header sorts from Z to A:
        header.click();
        cy.get('.sorting').should('contain', 'Sort tasks by: ALPHABET-REVERSE');

        // checking saving sorting in LocalStorage:
        cy.getLocalStorage('sortingTitle').should(
            'equal',
            JSON.stringify(sortingText.ALPHABET_REVERSE)
        );

        const alphabetReverseSortedExpected = [
            'Test todo',
            'CTest todo number two',
            'BTest todo number four',
            'ATest todo number three',
            '321123',
        ];

        cy.get('.todo-item').then((list) => {
            const labelsList = [...list].map((todo) => todo.firstChild.children[1].innerHTML);
            cy.wrap(labelsList).should('eql', alphabetReverseSortedExpected);
        });

        // after third click on header sorts by creation time:
        header.click();
        cy.get('.sorting').should('contain', 'Sort tasks by: CREATION DATE');

        // checking saving sorting in LocalStorage:
        cy.getLocalStorage('sortingTitle').should(
            'equal',
            JSON.stringify(sortingText.CREATION_DATE)
        );

        const byDateSortedExpected = [
            'Test todo',
            'CTest todo number two',
            'ATest todo number three',
            'BTest todo number four',
            '321123',
        ];

        cy.get('.todo-item').then((list) => {
            const labelsList = [...list].map((todo) => todo.firstChild.children[1].innerHTML);
            cy.wrap(labelsList).should('eql', byDateSortedExpected);
        });
    });
});

const localTodos = [
    { id: '1660138005899', created: 1660138005899, isCompleted: true, label: 'asds dsaddbsaddft' },
    { id: '1660138010767', created: 1660138010767, isCompleted: true, label: 'pouipiuoiuou' },
    { id: '1660138025187', created: 1660138025187, isCompleted: false, label: 'werewrewr' },
    { id: '1660138034979', created: 1660138034979, isCompleted: true, label: 'dfgfdamfdfd' },
    { id: '1660138040124', created: 1660138040124, isCompleted: true, label: 'iidfigdfigdf' },
    { id: '1660138042611', created: 1660138042611, isCompleted: false, label: 'bfsdfdsfds' },
    { id: '1660140356843', created: 1660140356843, isCompleted: false, label: '12213fdgd' },
    { id: '1660307378285', created: 1660307378285, isCompleted: false, label: 'test text' },
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

describe('Todo Functionality works with localStorage properly', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.viewport(1366, 768);
    });

    it('empty list with clean storage', () => {
        cy.visit(page);
        cy.get('.todo-item').should('not.exist');
        cy.getLocalStorage('todo-list').then((lsValue) => expect(JSON.parse(lsValue)).to.eql(null));
    });

    it('list sorted by creation date if in storage is list sorted by creation date', () => {
        cy.setLocalStorage('listTodos', JSON.stringify(todoListCreationDate));
        cy.setLocalStorage('sortingTitle', JSON.stringify(sortingText.CREATION_DATE));
        cy.visit(page);

        cy.get('.todo-item').then((list) => {
            const labelsList = [...list].map((todo) => todo.firstChild.children[1].innerHTML);
            // cy.wrap(labelsList).should("eql", byDateSortedExpected);
            expect(labelsList).to.eql(orderByCreationDate);
        });
    });

    it('list sorted by alphabet if in storage is list sorted by alphabet', () => {
        cy.setLocalStorage('listTodos', JSON.stringify(todoListAlphabet));
        cy.setLocalStorage('sortingTitle', JSON.stringify(sortingText.ALPHABET));
        cy.visit(page);

        cy.get('.todo-item').then((list) => {
            const labelsList = [...list].map((todo) => todo.firstChild.children[1].innerHTML);
            cy.wrap(labelsList).should('eql', orderByAlphabet);
        });
    });

    it('list sorted by alphabet if in storage is list sorted by alphabet reverse', () => {
        cy.setLocalStorage('listTodos', JSON.stringify(todoListAlphabetReverse));
        cy.setLocalStorage('sortingTitle', JSON.stringify(sortingText.ALPHABET_REVERSE));
        cy.visit(page);

        cy.get('.todo-item').then((list) => {
            const labelsList = [...list].map((todo) => todo.firstChild.children[1].innerHTML);
            cy.wrap(labelsList).should('eql', orderByReverseAlphabet);
        });
    });
});
