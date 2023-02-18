import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, create } from 'react-test-renderer';
import TodoItem from '../index';

const props = {
    todo: {
        id: 'todo-item',
        label: 'Test',
        isCompleted: false,
        created: 1676239243831,
    },
    dispatch: () => undefined,
};

function TestWrapper() {
    const [checked, setChecked] = React.useState();

    const props = React.useMemo(
        () => ({
            todo: {
                id: 'todo-item',
                label: 'Test',
                isCompleted: checked,
                created: 1676239243831,
            },
            dispatch: () => undefined,
        }),
        [checked]
    );

    return <TodoItem {...props} onChange={(e) => setChecked(e.target.checked)} />;
}

describe('TodoItem', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<TodoItem {...props} />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('click on the label checks the checkbox', async () => {
        const user = userEvent.setup();
        render(<TestWrapper />);
        const label = screen.getByTestId('Test-label');
        const checkbox = screen.getByTestId('Test-cb-input');
        expect(checkbox).not.toBeChecked();
        await user.click(label);
        expect(checkbox).toBeChecked();
    });

    test('label becomes editable after click on "Edit" button', async () => {
        const mockDispatch = jest.fn();
        const user = userEvent.setup();
        render(<TodoItem {...props} dispatch={mockDispatch} />);
        expect(screen.queryByTestId('Test-edit-field')).toBeNull();
        const editBtn = screen.getByText(/edit/i);
        await user.click(editBtn);
        expect(screen.queryByTestId('Test-edit-field')).toBeInTheDocument();
        await user.type(screen.queryByTestId('Test-edit-field'), ' text');
        expect(screen.queryByTestId('Test-edit-field').value).toBe('Test text');
    });

    test('after editing label value onBlur event calls dispatch callback', async () => {
        const mockDispatch = jest.fn();
        const user = userEvent.setup();
        render(<TodoItem {...props} dispatch={mockDispatch} />);
        await user.click(screen.getByText(/edit/i));
        await user.type(screen.queryByTestId('Test-edit-field'), ' text');
        expect(screen.queryByTestId('Test-edit-field').value).toBe('Test text');
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        screen.queryByTestId('Test-edit-field').blur();
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});
