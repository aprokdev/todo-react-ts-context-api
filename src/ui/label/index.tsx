import PropTypes from 'prop-types';
import * as React from 'react';
import './style.scss';
import { ILabelProps } from './types';

function Label({ id, children, className, testId = 'label' }: ILabelProps) {
    return (
        <label className={`label${className ? ` ${className}` : ''}`} htmlFor={id} data-testid={testId}>
            {children}
        </label>
    );
}

Label.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    testId: PropTypes.string,
};

export default Label;
