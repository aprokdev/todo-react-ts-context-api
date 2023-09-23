/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Button from '@ui/button';
import { actionTypes } from '@todo-context/actionTypes';
import './style.scss';
import { IClearLSProps } from './types';

function ClearLocalStorage({ isSavedTodos, dispatch }: IClearLSProps) {
    return (
        <div className="clear-local-storage">
            {isSavedTodos && (
                <Button
                    type="submit"
                    onClick={() => dispatch({ type: actionTypes.CLEAN_LS })}
                    disabled={false}
                    className="clear-local-storage__btn"
                    testId="clear-local-storage"
                >
                    Clear <span className="clear-local-storage__desktop">Local Storage</span>{' '}
                    <span className="clear-local-storage__mobile">LS</span>
                </Button>
            )}
        </div>
    );
}

// export default ClearLocalStorage;
export default React.memo(ClearLocalStorage);
