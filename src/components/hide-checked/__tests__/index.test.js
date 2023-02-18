import React from 'react';
import { act, create } from 'react-test-renderer';
import HideChecked from '../index';

describe('Sorting', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<HideChecked />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
