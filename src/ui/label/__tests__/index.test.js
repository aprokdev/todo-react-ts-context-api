import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, create } from 'react-test-renderer';
import Checkbox from '~ui/checkbox';
import Label from '../index';

const props = {
    className: 'test',
    id: 'test',
    children: 'Test',
};

describe('Checkbox', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<Label {...props} />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('add passed className prop to the end of classlist', () => {
        const className = 'test';
        render(
            <Label className={className} id="test">
                Test
            </Label>
        );
        const component = screen.getByTestId('label');
        const classListLength = component.classList.length;
        const lastClassName = component.classList[classListLength - 1];
        expect(lastClassName).toBe(className);
    });

    function TestWrapper({ isChecked = false }) {
        const [checked, setChecked] = React.useState(isChecked);
        const id = 'test';
        return (
            <div>
                <Label id={id}>Test</Label>
                <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} id={id} />
            </div>
        );
    }

    test('works with Checkbox component via id:', async () => {
        const user = userEvent.setup();
        render(<TestWrapper />);
        const label = screen.getByTestId('label');
        expect(screen.getByTestId('checkbox-input')).not.toBeChecked();
        await user.click(label);
        expect(screen.getByTestId('checkbox-input')).toBeChecked();
    });
});
