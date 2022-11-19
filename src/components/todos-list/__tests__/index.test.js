import React from 'react';
import { act, create } from 'react-test-renderer';
import TodosList from '../index';

describe('TodosList', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<TodosList />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
