/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import { IconCheck } from './icon';
import './style.scss';
import { ICheckboxProps } from './types';

function Checkbox(props: ICheckboxProps): JSX.Element {
    const { className, checked, onChange, id, testId = 'checkbox', disabled } = props;
    const inputRef = React.useRef(null);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLLabelElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            inputRef.current.click();
        }
    }, []);

    return (
        <span
            className={`checkbox${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}`}
            data-testid={testId}
        >
            <input
                type="checkbox"
                className="checkbox__input"
                checked={checked}
                id={id}
                onChange={onChange}
                ref={inputRef}
                data-testid={`${testId}-input`}
                disabled={disabled}
            />
            <label
                className="checkbox__square"
                htmlFor={id}
                tabIndex={0}
                onKeyDown={onKeyDown}
                data-testid={`${testId}-square`}
            >
                {checked && <IconCheck color="#fff" />}
            </label>
        </span>
    );
}

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    testId: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Checkbox;
