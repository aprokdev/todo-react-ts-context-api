/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { sortState } from '~src/todo-context';
import './style.scss';
import { ISortingProps } from './types';

function Sorting({ sorting, updateSorting }: ISortingProps) {
    const onHeaderlickHeader = React.useCallback(() => {
        if (sorting === sortState.BY_DATE) {
            updateSorting(sortState.ALPHABET);
            return;
        }
        if (sorting === sortState.ALPHABET) {
            updateSorting(sortState.ALPHABET_REVERSE);
            return;
        }
        if (sorting === sortState.ALPHABET_REVERSE) {
            updateSorting(sortState.BY_DATE);
            return;
        }
    }, [sorting, updateSorting]);

    const headerRef = React.useRef(null);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLHeadElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            headerRef.current.click();
        }
    }, []);

    return (
        <h4
            className="todo-list__header"
            onClick={onHeaderlickHeader}
            tabIndex={0}
            onKeyDown={onKeyDown}
            ref={headerRef}
        >
            ✨ Sort tasks by:
            {sorting === sortState.BY_DATE && ' CREATION DATE'}
            {sorting === sortState.ALPHABET && ' ALPHABET'}
            {sorting === sortState.ALPHABET_REVERSE && ' ALPHABET-REVERSE'}
        </h4>
    );
}

export default Sorting;
