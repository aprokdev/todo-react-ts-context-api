import PropTypes from 'prop-types';
import * as React from 'react';
import './style.scss';
import { ILabelProps } from './types';

function Label(props: ILabelProps): JSX.Element {
    const { id, children, className, testId = 'label' } = props;

    return (
        <label
            className={`label${className ? ` ${className}` : ''}`}
            htmlFor={id}
            data-testid={testId}
        >
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
