import React from 'react';
import { act, create } from 'react-test-renderer';
import ClearLocalStorage from '../index';

describe('Sorting', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<ClearLocalStorage />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
