import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, create } from 'react-test-renderer';
import Checkbox from '../index';

const props = {
    checked: false,
    className: 'test',
    id: 'test',
    onChange: () => null,
};

describe('Checkbox', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<Checkbox {...props} />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('add passed className prop to the end of classlist', () => {
        const className = 'test';
        render(<Checkbox {...props} className={className} />);
        const component = screen.getByTestId('checkbox');
        const classListLength = component.classList.length;
        const lastClassName = component.classList[classListLength - 1];
        expect(lastClassName).toBe(className);
    });

    test('onKeyDown event on focused <label> with Enter key fires onChange event in input', async () => {
        const mockChange = jest.fn();
        const user = userEvent.setup();
        render(<Checkbox onChange={mockChange} id="test" />);
        const square = screen.getByTestId('checkbox-square');
        const checkbox = screen.getByTestId('checkbox-input');
        square.focus();
        await user.keyboard('[Enter]');
        expect(mockChange).toHaveBeenCalledTimes(1);
        expect(checkbox.checked).toBe(true);
    });

    test('onClick event on <label> fires onChange event in input', async () => {
        const mockChange = jest.fn();
        const user = userEvent.setup();
        render(<Checkbox onChange={mockChange} id="test" />);
        const square = screen.getByTestId('checkbox-square');
        const checkbox = screen.getByTestId('checkbox-input');
        await user.click(square);
        expect(mockChange).toHaveBeenCalledTimes(1);
        expect(checkbox).toBeChecked();
    });
});
