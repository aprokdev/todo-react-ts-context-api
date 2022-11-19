import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';
import { IButtonProps } from './types';

function Button({ className, onClick, type, disabled, children, testId = 'button' }: IButtonProps) {
    return (
        <button
            type={type ? type : 'button'}
            className={`button${className ? ` ${className}` : ''}`}
            onClick={onClick}
            disabled={disabled}
            data-testid={testId}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    testId: PropTypes.string,
};

export default Button;
