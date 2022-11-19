import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, create } from 'react-test-renderer';
import Input from '../index';

const props = {
    checked: false,
    className: 'test',
    id: 'test',
    onBlur: () => null,
    onChange: () => null,
    placeholder: 'Type...',
    type: 'text',
    value: '',
    testId: 'input',
};

describe('Input', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<Input {...props} />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('add passed className prop to the end of classlist', () => {
        const className = 'test';
        render(<Input className={className} testId="input" />);
        const component = screen.getByTestId('input');
        const classListLength = component.classList.length;
        const lastClassName = component.classList[classListLength - 1];
        expect(lastClassName).toBe(className);
    });

    test('set default "text" type attribute if none was passed to the component', () => {
        render(<Input testId="input" />);
        const component = screen.getByTestId('input');
        const typeAttr = component.getAttribute('type');
        expect(typeAttr).toBe('text');
    });

    test('onChange event changes value', async () => {
        const handleChange = jest.fn();
        const user = userEvent.setup();
        render(<Input onChange={handleChange} testId="input" />);
        const input = screen.getByTestId('input');
        await user.type(input, 't');
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('t');
        await user.type(input, 't');
        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(input.value).toBe('tt');
        await user.clear(input);
        expect(handleChange).toHaveBeenCalledTimes(3);
        expect(input.value).toBe('');
    });
});
