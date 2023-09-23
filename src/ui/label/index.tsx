import PropTypes from 'prop-types';
import * as React from 'react';
import './style.scss';
import { ILabelProps } from './types';

function Label(props: ILabelProps): JSX.Element {
    const { children, className, htmlFor, testId = 'label', disabled } = props;

    return (
        <label
            className={`label${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}`}
            htmlFor={htmlFor}
            data-testid={testId}
        >
            {children}
        </label>
    );
}

Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    testId: PropTypes.string,
    diabled: PropTypes.bool,
};

export default Label;
