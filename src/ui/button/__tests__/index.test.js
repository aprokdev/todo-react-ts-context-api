import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, create } from 'react-test-renderer';
import Button from '../index';

const props = {
    className: 'test',
    onClick: () => null,
    type: 'submit',
    disabled: false,
    children: 'Text',
};

describe('Button', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<Button {...props} />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('add passed className prop to the end of classlist', () => {
        const className = 'test';
        render(
            <Button className={className} onClick={() => null}>
                button
            </Button>
        );
        const button = screen.getByTestId('button');
        const classListLength = button.classList.length;
        const lastClassName = button.classList[classListLength - 1];
        expect(lastClassName).toBe(className);
    });

    test('set default "button" type attribute if none was passed to the component', () => {
        render(<Button onClick={() => null}>button</Button>);
        const button = screen.getByTestId('button');
        const typeAttr = button.getAttribute('type');
        expect(typeAttr).toBe('button');
    });

    test('click on Button fires onClick event', async () => {
        const handleClick = jest.fn();
        const user = userEvent.setup();
        render(<Button onClick={handleClick}>button</Button>);
        const button = screen.getByTestId('button');
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
