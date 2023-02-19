/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { actionTypes } from '~todo-context/actionTypes';
import { sortingText } from '~todo-context/reducer';
import './style.scss';
import { ISortingProps } from './types';

function Sorting({ sortingTitle, dispatch }: ISortingProps) {
    const onHeaderlickHeader = React.useCallback(() => {
        if (sortingTitle === sortingText.CREATION_DATE) {
            dispatch({ type: actionTypes.SORT_BY_ALPHABET });
        }
        if (sortingTitle === sortingText.ALPHABET) {
            dispatch({ type: actionTypes.SORT_BY_ALPHABET_REVERSE });
        }
        if (sortingTitle === sortingText.ALPHABET_REVERSE) {
            dispatch({ type: actionTypes.SORT_BY_DATE });
        }
    }, [dispatch, sortingTitle]);

    const headerRef = React.useRef(null);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLHeadElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            headerRef.current.click();
        }
    }, []);

    return (
        <div className="sorting">
            <h3
                className="sorting__title"
                onClick={onHeaderlickHeader}
                tabIndex={0}
                ref={headerRef}
                onKeyDown={onKeyDown}
            >
                ✨ Sort tasks by: {sortingTitle}
            </h3>
        </div>
    );
}

export default Sorting;
// export default React.memo(Sorting);
